/**
 * Created by hugh on 17/3/1.
 */
'use strict'
const yeoman = require('yeoman-generator')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')
const extend = require('deep-extend')
const mkdirp = require('mkdirp')
const selfupdate = require('selfupdate')
const packageJSON = require('../../package.json')
const notifier = require('node-notifier')
const util = require('./util')


module.exports = yeoman.Base.extend({
    initializing() {
        this.props ={}
        //tip for update this generator
        //try{
        //    selfupdate.isUpdated(packageJSON, (error, isUpdated) => {
        //        if (error) throw error
        //        if (isUpdated) return
        //            notifier.notify({
        //                title: 'generator-h-vue-component',
        //                subtitle: '已有新版本,正在更新...',
        //                message: '如果更新失败，请手动更新\n执行 npm i -g generator-h-vue-component',
        //                contentImage: path.resolve(__dirname, 'peon.gif'),
        //                sound: true,
        //                wait: true
        //            })
        //        selfupdate.update(packageJSON, (error, version) => {
        //        if (error) throw error
        //        notifier.notify({
        //        title: 'generator-h-vue-component',
        //        subtitle: '更新完毕',
        //        message: '请重新运行本应用\n执行 yo generator-h-vue-component',
        //        sound: true,
        //        wait: true
        //    })
        //})
        //})
        //} catch(ex) {
        //    console.log(ex)
        //}
    },
    prompting(){
        const done = this.async()
        var prompts = require('./prompts')(this)
        this.prompt(prompts).then((props) => {
            this.props = props;
            done()
    })
    },
    writing: {
        //copy template files
        directories: function (){
            this.fs.copyTpl(
                this.templatePath('./') + "/**/*.*",
                this.destinationPath('./'),
                {name: this.props.name}
            );
            this.fs.copy(
                this.templatePath('./src/components/test.vue'),
                this.destinationPath('./src/components/'+this.props.name+'.vue')
            );
            this.fs.delete('./src/components/test.vue')
        },

        package_json: function () {
            const currentPkg = this.fs.readJSON('package.json', {})
            this.pkg = extend(currentPkg, {
                name: this.props.name,
                version: this.props.version,
                description: this.props.description,
                main:'./dist/'+this.props.name+'.min.js',
                repository: {
                    type: 'git',
                    url: this.props.repo
                },
                author: {
                    name: this.props.author,
                    email: this.props.email
                },
                keywords: [],
                bugs: {
                    url: 'http://' + util.getHomeUrl(this.props.repo) + '/issues'
                },
                homepage: 'http://' + util.getHomeUrl(this.props.repo)
            });
            if (this.props.keywords) {
                this.pkg.keywords = _.uniq(this.props.keywords.concat(this.pkg.keywords))
            }
            this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
        },
        file:function(){
            this.copy('babelrc','.babelrc');
            this.copy('gitignore','.gitignore');
            this.copy('npmignore','.npmignore');
        }

    },
    install:function() {
        let opt={
            cwd:this.destinationPath('./')
        };
        //this.spawnCommandSync('npm', ['install'],opt);
    }
});