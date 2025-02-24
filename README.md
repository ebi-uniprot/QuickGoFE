# QuickGoFE

QuickGO is a fast web-based browser of the Gene Ontology and Gene Ontology annotation data. It is maintained and developed by the UniProt-GOA project based at the EBI.

http://www.ebi.ac.uk/QuickGO

## Building & Serving

Locally you can use any of the following commands to build or serve. CI/CD automatically happens on pushes to the respective branch within GitLab.

| Command            | `base`                            | `apiEndpoint`                             | CI/CD branch |
|--------------------|-----------------------------------|-------------------------------------------|--------------|
| `grunt build:prod` | https://www.ebi.ac.uk/QuickGO/    | https://www.ebi.ac.uk/QuickGO/services    | `main`       |
| `grunt build:dev`  | https://wwwdev.ebi.ac.uk/QuickGO/ | https://wwwdev.ebi.ac.uk/QuickGO/services | `dev`        |
| `grunt serve`      | /                                 | https://wwwdev.ebi.ac.uk/QuickGO/services |              |


### Serving locally with the ruby-node docker image

The following will start a grunt server on port 9000 of your local machine.

```
docker run -p 9000:9000 --rm -it --entrypoint sh dockerhub.ebi.ac.uk/uniprot/front-end/front-end-docker/ruby-node:latest
git clone https://github.com/ebi-uniprot/QuickGoFE.git
cd QuickGoFE
npm install
bower install
grunt serve
```

to use your local copy of QuickGoFE:

```
docker run -p 9000:9000 --rm -it -v "$(pwd):/QuickGoFE" --entrypoint sh dockerhub.ebi.ac.uk/uniprot/front-end/front-end-docker/ruby-node:latest
cd QuickGoFE
npm install
bower install
grunt serve
```

## License

Distributed under the Apache License 2.0
