# grunt-i18nprocessor

> Grunt i18n processor

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-i18nprocessor --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18nprocessor');
```

## The "i18nprocessor" task

### Overview
In your project's Gruntfile, add a section named `i18nprocessor` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  i18nprocessor: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

The task is designed to take a JSON i18n Langauge file and split it into separate language specific files

```js
{
    "validateFail_number": {
        "en": "Numeric value required",
        "de": "Numerischer Wert erforderlich",
        "fr": "Valeur numérique obligatoire",
        "nl": "Numerieke waarde verplicht",
        "fi": "Täytä numeerinen arvo"
    },
    "validateFail_email": {
        "en": "Valid email address required",
        "de": "Gültige E-Mail-Adresse erforderlich.",
        "fr": "Adresse mail valide obligatoire",
        "nl": "Geldig e-mailadres verplicht",
        "fi": "Lisää toimiva sähköpostiosoite"
    }
}
```

will produce separate files for each language..

eg. `lang.en.js...`


```js
{
 "copyrightNotice":"My Company (c) Copyright 2006-2015 All Rights Reserved.",
 "strings":{
        "validateFail_number":"Numeric value required",
        "validateFail_email":"Valid email address required"
    }
}
```



### Options

#### options.languages
Type: `Array`
Default value: `["en"]`

A array of base language codes. A new language file will get created for each of these languages

#### options.pretty
Type: `Boolean`
Default value: `false`

If true the output JSON is tab separated and readable. 

#### options.copyright
Type: `String`
Default value: ``

The copyright string to add into the output json

#### options.filenameMask
Type: `String`
Default value: `ux4.%1.js`

The filename mask for the output files. %1 gets replaced with the language code

#### options.outputEnglishIfNoTranslation
Type: `Boolean`
Default value: `true`

Output the english string if the string doesn't have a translation for the current language


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  i18nprocessor: {
    options: {
        languages: ['en','de'],
        pretty: false,
        copyright: "MyCompany (c) 2015"
    },
    ux4: {
        'src': 'myappi18nfile.json',
        'dest': '/i18n/'
    },
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
