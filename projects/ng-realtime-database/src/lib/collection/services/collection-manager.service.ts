import {Injectable} from '@angular/core';
import {CollectionInformationService} from './collection-information.service';
import {CollectionValuesService} from './collection-values.service';
import {CollectionBase} from '../collection-base';
import {DefaultCollection} from '../default-collection';
import {IPrefilter} from '../prefilter/iprefilter';
import {ArrayHelper} from '../../helper/array-helper';
import {ReducedCollection} from '../reduced-collection';
import {CollectionHelper} from '../../helper/collection-helper';
import {OrderByPrefilter} from '../prefilter/order-by-prefilter';
import {OrderedCollection} from '../ordered-collection';
import {ThenOrderByPrefilter} from '../prefilter/then-order-by-prefilter';
import {ConnectionManagerService} from '../../connection/services/connection-manager.service';

@Injectable()
export class CollectionManagerService {

  private collections: CollectionBase<any, any>[] = [];

  constructor(private connectionManagerService: ConnectionManagerService, private collectionInformation: CollectionInformationService,
              private collectionValuesService: CollectionValuesService) {}

  public getCollection<T>(collectionName: string, contextName: string, prefilters: IPrefilter<any, any>[],
                          newPrefilter?: IPrefilter<any, any>): CollectionBase<T, any> {
    const newPrefilters = prefilters.slice(0);

    if (newPrefilter) {
      newPrefilters.push(newPrefilter);
    }

    const foundCollections: DefaultCollection<T>[] = <any>this.collections
      .filter(c => this.collectionPredicate(collectionName, newPrefilters)(c));

    if (foundCollections.length > 0) {
      return foundCollections[0];
    } else {
      let newCollection;
      if (CollectionHelper.afterQueryPrefilters.findIndex(v => newPrefilter instanceof v) !== -1) {
        newCollection = new ReducedCollection<any, any>(
          collectionName,
          contextName,
          this.connectionManagerService,
          this.collectionInformation.getCollectionInformation(collectionName, contextName),
          this.collectionValuesService,
          this);
      } else if (newPrefilter instanceof OrderByPrefilter || newPrefilter instanceof ThenOrderByPrefilter) {
        newCollection = new OrderedCollection<any>(
          collectionName,
          contextName,
          this.connectionManagerService,
          this.collectionInformation.getCollectionInformation(collectionName, contextName),
          this.collectionValuesService,
          this);
      } else {
        newCollection = new DefaultCollection<any>(
          collectionName,
          contextName,
          this.connectionManagerService,
          this.collectionInformation.getCollectionInformation(collectionName, contextName),
          this.collectionValuesService,
          this);
      }

      newCollection.prefilters = newPrefilters;

      this.collections.push(newCollection);
      return newCollection;
    }
  }

  public removeCollection(collection: CollectionBase<any, any>) {
    const index = this.collections.findIndex(c => this.collectionPredicate(collection.collectionName, collection.prefilters)(c));
    if (index !== -1) {
      this.collections.splice(index, 1);
    }
  }

  private collectionPredicate = (collectionName: string, prefilters: IPrefilter<any, any>[]) => {
    const prefilterHash = ArrayHelper.createPrefilterHash(prefilters);
    return c => c.collectionName === collectionName && ArrayHelper.createPrefilterHash(c.prefilters) === prefilterHash;
  }

  public reset() {
    this.collections.forEach(c => c.reset());
  }
}