import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {UserData} from './user-data';
import {RealtimeDatabase} from '../../realtime-database.service';
import {REALTIME_DATABASE_OPTIONS, RealtimeDatabaseOptions} from '../../models/realtime-database-options';

@Injectable()
export class RealtimeAuthGuard implements CanActivate, CanActivateChild {
  constructor(private db: RealtimeDatabase, private router: Router,
              @Inject(REALTIME_DATABASE_OPTIONS) private options: RealtimeDatabaseOptions) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.db.auth.isLoggedIn().pipe(switchMap((loggedIn: boolean) => {
      if (!loggedIn) {
        this.redirect(this.options.loginRedirect, state.url);
        return of(false);
      }

      const roles: string[] = next.data['roles'];
      return this.checkRoles(roles, state.url);
    }));
  }

  private checkRoles(roles: string[], returnUrl: string): Observable<boolean> {
    return this.db.auth.getUserData().pipe(map((userData: UserData) => {
      if (roles && roles.length > 0) {
        if (!userData) {
          return false;
        }

        let hasRole = false;

        for (const role of roles) {
          if (userData.roles.indexOf(role) !== -1) {
            hasRole = true;
            break;
          }
        }

        if (!hasRole) {
          this.redirect(this.options.unauthorizedRedirect, returnUrl);
          return false;
        }
      }

      return true;
    }));
  }

  private redirect(url: string, returnUrl: string) {
    if (url) {
      this.router.navigate([url], {
        queryParams: {
          return: returnUrl
        }
      });
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}