# ng-sapphiredb - Angular client [![Build Status](https://travis-ci.org/morrisjdev/ng-realtime-database.svg?branch=master)](https://travis-ci.org/morrisjdev/ng-realtime-database) [![Maintainability](https://api.codeclimate.com/v1/badges/6cc48bef1a9e51422f95/maintainability)](https://codeclimate.com/github/morrisjdev/ng-realtime-database/maintainability) 

<p align="center">
  <a href="https://sapphire-db.com/">
    <img src="https://sapphire-db.com/assets/banner/SapphireDB%20Banner.png" alt="SapphireDb logo">
  </a>
</p>

SapphireDb is an open source library that enables you to easily create your own application with realtime data synchronization.

Build amazing applications with less effort and get the best results of your project. SapphireDb should serve as a self hosted alternative to firebase and also gives you an alternative to SignalR.

Check out the documentation for more details: [Documentation](https://sapphire-db.com/)

<p align="center">
    <a href="https://www.patreon.com/user?u=27738280"><img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160"></a>
</p>

## Advantages

- :wrench: Dead simple configuration
- :stars: Blazing fast development
- :satellite: Modern technologies
- :computer: Self hosted
- :floppy_disk: Easy CRUD operations
- :key: Authentication/Authorization included
- :heavy_check_mark: Database support
- :electric_plug: Actions
- :globe_with_meridians: NLB support

## Installation

### Install Package
To use ng-sapphiredb you have to install the package using node.js

In your Angular App-Folder execute

```
npm install ng-sapphiredb -S
```

### Import SapphireDbModule in your app.module

```
imports: [
    BrowserModule,
    SapphireDbModule, 
]
```

## Browser compatibility

| Browser              | Websocket          | SSE                | Polling            |
|----------------------|--------------------|--------------------|--------------------|
| Chrome               | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Firefox              | :heavy_check_mark: | :x:                | :heavy_check_mark: |
| Opera                | :heavy_check_mark: | :x:                | :heavy_check_mark: |
| Edge                 | :heavy_check_mark: | :x:                | :heavy_check_mark: |
| Internet Explorer 11 | :heavy_check_mark: | :x:                | :heavy_check_mark: |

## Documentation

Check out the documentation for more details: [Documentation](https://sapphire-db.com/)

## Implementations

[SapphireDb - Server for Asp.Net Core](https://github.com/morrisjdev/SapphireDb)

[ng-sapphiredb - Angular client](https://github.com/morrisjdev/ng-sapphiredb)

## Author

[Morris Janatzek](http://morrisj.net) ([morrisjdev](https://github.com/morrisjdev))

## License

ng-sapphiredb - [MIT License](https://github.com/morrisjdev/SapphireDb/blob/master/LICENSE)
