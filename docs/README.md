# GeoSmart Site


## Installation of Ruby & Jekyll (on Windows)

Go to https://rubyinstaller.org/downloads/ and install ruby + devkit. Run it and follow the default installation options, making sure to run the `ridk install` step on the last stage of the wizard.

Now from the command prompt run
```
gem install jekyll bundler
```

## Installation of Jekyll (on Mac)

```ruby
gem install bundler jekyll
```


If not able to run `jekyl ` on Mac, run

`gem install -n /usr/local/bin jekyll`

Jekyll & Mac OS X 10.11Permalink

With the introduction of System Integrity Protection, several directories that were previously writable are now considered system locations and are no longer available. Given these changes, there are a couple of simple ways to get up and running. One option is to change the location where the gem will be installed (again, using sudo only if necessary):

https://stackoverflow.com/questions/8146249/jekyll-command-not-found



### First time only, if you creating this site (DO NOT RUN)

jekyll new geosmart-site


## Installation

There are three ways to install: as a [gem-based theme](https://jekyllrb.com/docs/themes/#understanding-gem-based-themes), as a [remote theme](https://blog.github.com/2017-11-29-use-any-theme-with-github-pages/) (GitHub Pages compatible), or forking/directly copying all of the theme files into your project.

### Gem-based method

With Gem-based themes, directories such as the `assets`, `_layouts`, `_includes`, and `_sass` are stored in the theme’s gem, hidden from your immediate view. Yet all of the necessary directories will be read and processed during Jekyll’s build process.

This allows for easier installation and updating as you don't have to manage any of the theme files. To install:

1. Add the following to your `Gemfile`:

   ```ruby
   gem "minimal-mistakes-jekyll"
   ```

2. Fetch and update bundled gems by running the following [Bundler](http://bundler.io/) command:

   ```bash
   bundle
   ```

3. Set the `theme` in your project's Jekyll `_config.yml` file:

   ```yaml
   theme: minimal-mistakes-jekyll
   ```

To update the theme run `bundle update`.


## Serving it locally

```bash
 bundle exec jekyll serve
  ```
   

## Building it for GitHub Pages

_config.yaml has the configuration for our site. 

```bash
 bundle exec jekyll build
 ```

 ## Miscelaneuos tips
 ### Custom CSS styling
 Do not edit `_site/assets/css/main.css`, it will not do anything. Go to `assets/css/main.scss` do create custom styles. If you need to change default jekyll css, you will have to override it.