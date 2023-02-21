# QuickGoFE

QuickGO is a fast web-based browser of the Gene Ontology and Gene Ontology annotation data. It is maintained and developed by the UniProt-GOA project based at the EBI.

http://www.ebi.ac.uk/QuickGO

## Building & Serving

Locally you can use any of the following commands build and serve. CI/CD automotically happens on pushes to the respective CI/CD branch within GitLab.

| Command            | `base`                            | `apiEndpoint`                             | CI/CD branch |
|--------------------|-----------------------------------|-------------------------------------------|--------------|
| `grunt build:prod` | https://www.ebi.ac.uk/QuickGO/    | https://www.ebi.ac.uk/QuickGO/services    | `main`       |
| `grunt build:dev`  | https://wwwdev.ebi.ac.uk/QuickGO/ | https://wwwdev.ebi.ac.uk/QuickGO/services | `dev`        |
| `grunt serve`      | /                                 | https://wwwdev.ebi.ac.uk/QuickGO/services |              |

## License

Distributed under the Apache License 2.0
