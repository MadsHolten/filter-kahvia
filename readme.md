## Team Filter Kahvia @ AEC Hackathon 2019, Copenhagen

This is a demonstration of the application of the [Linked Building Data (LBD) toolset](https://github.com/w3c-lbd-cg).

## About the project
-

## Team participants
| Name                  | Affiliation                                                                                     |
| :-------------------- | -----------------------------------------------------------------------------------------------:|
| Jyrki Oraskari        | [Aalto University](https://www.aalto.fi/)                                                       |
| Morten Graven Bilde   | [Juul Frost](http://www.juulfrost.dk/)                                                          |
| Joni Turunen          | [Granlund](https://www.granlundgroup.com/)                                                      |
| Davor Stjelja         | [Granlund](https://www.granlundgroup.com/)                                                      |
| Rasmus Christiansen   | [Technical University of Denmark](https://www.dtu.dk/english/)                                  |
| Mads Holten Rasmussen | [Niras](https://www.niras.com/) / [Technical University of Denmark](https://www.dtu.dk/english/)|

## Install prototype

### 1. Install triplestore
First step is to install a local triplestore. For example the open source Jena Fuseki (get it from [here](https://jena.apache.org/download/index.cgi)). Unzip the file in a local directory and [run the server](https://jena.apache.org/documentation/fuseki2/fuseki-run.html).

### 2. Load files
Create a dataset named `1` and load the `data/geometry-topology.ttl` RDF file in there (must be stored in a named graph). For example through the user interface on localhost:3030 (Fuseki).

### 3. Frontent

#### 3.1 The easy way
The easy way is to just download the zip in the frontend folder and run a local server from that directory. Python has one preinstalled:

Python 2.7
```
python -m SimpleHTTPServer 8000
```

Python 3.x
```
python -m http.server 8000
```

There are also NodeJS libraries for this. For example: [http-server](https://www.npmjs.com/package/http-server).

#### 3.2 For development
For development, a development server must be set up.
Install the latest version of [NodeJS](https://nodejs.org/en/) and then install [Angular CLI](https://cli.angular.io/) through npm.

Then go to the `frontend/filter-kahvia` directory and run the command `npm install` to install all the project dependencies. Run the command `ng serve --open` and a browser window with the application will open (use Chrome!).

All the interesting stuff is going on in the `src/app` directory. The services take care of communication with the triplestore and the components render the data.


### Revit export
Exporting the main geometry from Revit is handled with the [Revit-bot-exporter](https://github.com/MadsHolten/revit-bot-exporter). We are looking for people who can help us making this a proper Revit app!

### Dynamo connection
The dynamo definition in folder `Revit-Dynamo` demonstrates how new triples (objects and their relationships to other relationships) are sent to the triplestore. We are looking for people who can help us making this process more smooth!

### IFC conversion
IFC files can be converted to LBD triples using the [IFCtoLBD converter](https://github.com/jyrkioraskari/IFCtoLBD).