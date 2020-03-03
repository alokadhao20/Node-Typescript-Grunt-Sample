node -v
v12.16.1

npm -v
6.13.4

Global install 
npm install -g ts-node
npm install –g grunt-cli OR 
npm install -g grunt-cli


mkdir inspireit.com
cd inspireit.com
npm init

npm install -D typescript


npm install express -S
npm install @types/express -D
npm install -g ts-node
### create a new file tsconfig in root dir ### 
{
    "compilerOptions": {
      "module": "commonjs",
      "esModuleInterop": true,
      "target": "es6",
      "moduleResolution": "node",
      "sourceMap": true,
      "outDir": "dist"
    },
    "lib": ["es2015"],
    "jsRules": {
        "no-empty": true
    }
}


### TSLINT ### 
npm install -D tslint
un the following command to generate a tslint.json file:
./node_modules/.bin/tslint --init

## add rule of allow console in tsling ### 
"rules": {
    "no-console": false
},

### add start script in package.json file ### 
 "scripts": {
    "start": "tsc && node dist/app.js",
    "test": "npm test"
  },

## make src ## 
mkdir src
cd src 
touch server.js


### Creating and Running a Basic Express Server ### 

import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

### Setting Grunt ### 


touch gruntfile.js
  module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // Default tasks.
    grunt.registerTask('default', []);
  };

  ### SETTING UP THE TYPESCRIPT DEFINITIONS ###
  npm install --save @types/node


  ## adding grunt plugin 

  npm install grunt-ts --save-dev

  ### Add into gruntfile.js init config ### 
  ts: {
    build: {
        src: ["server.ts", "!node_modules/**/*.ts"],
        // Avoid compiling TypeScript files in node_modules
        options: {
            module: 'commonjs',
            // To compile TypeScript using external modules like NodeJS
            fast: 'never'
            // You'll need to recompile all the files each time for NodeJS
        }
    }
}

  grunt.loadNpmTasks("grunt-ts");
 
    // Default tasks.
    grunt.registerTask('default', ["ts:build"]);

## grunt TS lint ## 
npm install grunt-tslint --save-dev

## add task in gruntfile.js ### 
tslint: {
    options: {
        configuration: grunt.file.readJSON("tslint.json")
    },
    all: {
        src: ["server.ts", "!node_modules/**/*.ts", "!obj/**/*.ts", "!typings/**/*.ts"]
        // avoid linting typings files and node_modules files
    }
}

and load it 

grunt.loadNpmTasks("grunt-tslint");

Add into default register task 
grunt.registerTask('default', ["tslint:all", "ts:build"]);


### AUTOMATE LINTING AND COMPILATION ### 
npm install grunt-contrib-watch --save-dev

Add to gruntfile.js as task 

watch: {
    scripts: {
        files: ['server.ts', '!node_modules/**/*.ts'], // the watched files
        tasks: ["tslint:all", "ts:build"], // the task to run
        options: {
            spawn: false // makes the watch task faster
        }
    }
}

load it 
grunt.loadNpmTasks("grunt-contrib-watch");


### Only compile new files ### 
npm install grunt-newer --save-dev

grunt.loadNpmTasks("grunt-newer");

Change your watch task to add newer before the tslint task like that:
  tasks: ["newer:tslint:all", "ts:build"], // the task to run


### AUTOMATE THE NODE SERVER ### 
npm install -g nodemon
npm install grunt-nodemon --save-dev

Configure the plugin: gruntfile.js 

nodemon: {
    dev: {
        script: 'server.js'
    },
    options: {
        ignore: ['node_modules/**', 'Gruntfile.js'],
        env: {
            PORT: '8181'
        }
    }
}

Load the task 
grunt.loadNpmTasks("grunt-nodemon");



## add concurent task ## 
npm install grunt-concurrent --save-dev

concurrent: {
    watchers: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    }
}

grunt.loadNpmTasks("grunt-concurrent");

## Create a serve task that will call watch and then nodemon: ## 
grunt.registerTask("serve", ["concurrent:watchers"]);