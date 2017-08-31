'use strict';
app.controller('AnnotationListCtrl', function($rootScope, $scope, $http, $routeParams,
    olsService, geneProductService, searchService, termService, taxonomyService, $modal) {
    /**
     * Initialisation
     */
    $scope.itemsPerPage = 25;
    $scope.pageLimit = 25;
    $rootScope.header = 'QuickGO::Annotation List';
    $scope.olsxrefs = {};

    $scope.currentPage = 1;

    // Default visibility of columns in the results page
    $scope.columns = {
        'geneProduct': {
            'label': 'Gene Product',
            'visible': true,
            'customizable': false,
            'tooltip': 'The sequence IDs that have been annotated with GO Terms.',
            'downloadLabel': 'geneProductId'
        },
        'symbol': {
            'label': 'Symbol',
            'visible': true,
            'customizable': true,
            'tooltip': 'The symbols corresponding to the Gene Product ID. An officially approved gene symbol when available or other gene symbols or locus names.',
            'downloadLabel': 'symbol'
        },
        'qualifier': {
            'label': 'Qualifier',
            'visible': true,
            'customizable': true,
            'tooltip': 'Defines the relationship between Gene product and GO term.',
            'downloadLabel': 'qualifier'
        },
        'goIdentifier': {
            'label': 'GO Term',
            'visible': true,
            'customizable': false,
            'tooltip': 'The unique, stable identifier of the GO term.',
            'downloadLabel': 'goId,goName'
        },
        'slimmedTerm': {
            'label': 'Original GO term',
            'visible': false,
            'customizable': false,
            'tooltip': 'The GO term of the original annotation when annotations have been slimmed up to higher-level terms.'
        },
        'evidence': {
            'label': 'Evidence',
            'visible': true,
            'customizable': true,
            'tooltip': 'GO terms are assigned to proteins based on different evidence. This is represented by an evidence code.',
            'downloadLabel': 'evidenceCode,goEvidence'
        },
        'reference': {
            'label': 'Reference',
            'visible': true,
            'customizable': true,
            'tooltip': 'A PubMed reference or a GO_REF identifier which contains either the data supporting the annotation or details of the electronic method applied to generate the annotation.',
            'downloadLabel': 'reference'
        },
        'withFrom': {
            'label': 'With / From',
            'visible': true,
            'customizable': true,
            'tooltip': 'An additional ID to support annotations using certain evidence codes (including IEA, IPI, IGI, IC and ISS evidences). E.g. UniProtKB:O00341, InterPro:IPROO1878 …',
            'downloadLabel': 'withFrom'
        },
        'taxon': {
            'label': 'Taxon',
            'visible': true,
            'customizable': true,
            'tooltip': 'The taxonomic ID for the species being annotated.',
            'downloadLabel': 'taxonId'
        },
        'assignedBy': {
            'label': 'Assigned By',
            'visible': true,
            'customizable': true,
            'tooltip': 'The database which created the annotation. The GO annotation may not be copied without acknowledgement of the data source.',
            'downloadLabel': 'assignedBy'
        },
        'annotationExtension': {
            'label': 'Annotation Extension',
            'visible': true,
            'customizable': true,
            'tooltip': 'Used in conjunction with the GO term, this gives a more specific annotation',
            'downloadLabel': 'extensions'
        },
        'date': {
            'label': 'Date',
            'visible': false,
            'customizable': true,
            'tooltip': 'Date on which the annotation was made',
            'downloadLabel': 'date'
        },
        'name': {
            'label': 'Name',
            'visible': false,
            'customizable': true,
            'tooltip': 'The name of the Gene Product.',
            'downloadLabel': 'name'
        },
        'synonym': {
            'label': 'Synonym',
            'visible': false,
            'customizable': true,
            'tooltip': 'The synonyms or gene symbols associated with the protein.',
            'downloadLabel': 'synonyms'
        },
        'type': {
            'label': 'Type',
            'visible': false,
            'customizable': true,
            'tooltip': 'The type of gene product that has been annotated.',
            'downloadLabel': 'type'
        },
        'taxonName': {
            'label': 'Taxon name',
            'visible': false,
            'customizable': true,
            'tooltip': 'The name of the species that matches the taxonomic identifier being annotated.',
            'downloadLabel': 'taxonName'
        }
    };

    function postProcessTaxa(taxaIds) {
        $scope.taxaMapping = {};
        if (taxaIds.length !== 0) {
            var taxonomyPromise = taxonomyService.getTaxa(taxaIds);
            taxonomyPromise.then(function(multipleTaxa) {
                angular.forEach(multipleTaxa.data.taxonomies, function(taxon) {
                    $scope.taxaMapping[taxon.taxonomyId] = taxon;
                });
            });
        }
    }

    function postProcessGeneProds(geneProductIds) {
        $scope.gpMapping = {};
        if (geneProductIds.length !== 0) {
            var geneProdPromise = geneProductService.getGeneProducts(geneProductIds);
            geneProdPromise.then(function(response) {
                angular.forEach(response.data.results, function(geneProd) {
                    $scope.gpMapping[geneProd.id] = geneProd;
                });
            });
        }
    }

    function postProcessGoTerms(goTermIds) {
        $scope.goTermMapping = {};

        termService.getGOTerms(goTermIds).then(function(resp) {
            angular.forEach(resp.data.results, function(goTerm) {
                $scope.goTermMapping[goTerm.id] = goTerm;
            });
        });
    }

    function postProcess() {
        var taxaIds = [];
        var geneProductIds = [];
        var goTermIds = [];

        angular.forEach($scope.annotations, function(annotation) {
            taxaIds.push(annotation.taxonId);
            goTermIds.push(annotation.goId);
            if (annotation.slimmedIds) {
                goTermIds = goTermIds.concat(annotation.slimmedIds);
            }

            var pos = annotation.geneProductId.indexOf(':');
            if (pos !== -1) {
                annotation.geneProductSimpleId = annotation.geneProductId.substring(pos + 1);
                geneProductIds.push(annotation.geneProductSimpleId);
            }

            _.forEach(annotation.extensions, function(d) {
                _.forEach(d.connectedXrefs, function(xref) {
                    // UniProt, Intact, RNAcentral NOTE: will have to change to complext portal
                    if (xref.db === 'UniProtKB' || xref.db === 'Intact' || xref.db === 'IntAct' || xref.db === 'RNAcentral' || xref.db === 'NCBI_Gene' || xref.db === 'WB') {
                        //TODO retrieve directly from cores
                    } else if (xref.db === 'ENSEMBL') {
                        //TODO use EnsEMBL API
                    } else {
                        olsService.getTermName(xref.db, xref.id)
                          .then(
                            function(resp) {
                              $scope.olsxrefs[xref.db + ':' + xref.id] = resp.data.label;
                            },
                            function(reason) {
                              console.log('ERROR (OLS):', reason)
                            }
                          );
                    }
                });
            });
        });

        postProcessTaxa(_.unique(taxaIds));
        postProcessGeneProds(_.unique(geneProductIds));
        postProcessGoTerms(_.unique(goTermIds));
    }

    function getResultsPage() {
        var query = $routeParams;
        if (query.goUsage === 'slim') {
            $scope.columns.slimmedTerm.visible = true;
        }

        $scope.resultsPromise = searchService.findAnnotations($scope.currentPage, $scope.itemsPerPage,
            searchService.serializeQuery(query));
        $scope.resultsPromise.then(function(data) {
            $scope.goList = data.data;
            $scope.annotations = $scope.goList.results;
            $scope.totalItems = $scope.goList.numberOfHits;
            postProcess();
        });
    }

    $scope.openFromWith = function(withFrom) {
        $modal.open({
            templateUrl: 'annotationsList/withfromModal.html',
            size: 'large',
            resolve: {
                withFrom: function() {
                    return withFrom;
                }
            },
            controller: function($scope, $modalInstance, withFrom) {
                $scope.withFrom = withFrom;
                $scope.ok = function() {
                    $modalInstance.close();
                };
            }
        });
    };
    $scope.openAnnoExtension = function(annoExt) {
        $modal.open({
            templateUrl: 'annotationsList/annoExtensionModal.html',
            size: 'large',
            resolve: {
                annoExt: function() {
                    return annoExt;
                },
                olsxrefs: function() {
                    return $scope.olsxrefs;
                }
            },
            controller: function($scope, $modalInstance, annoExt, olsxrefs) {
                $scope.olsxrefs = olsxrefs;
                $scope.annoExt = annoExt;
                $scope.ok = function() {
                    $modalInstance.close();
                };
            }
        });
    };


    $scope.pageChanged = function() {
        getResultsPage();
    };

    $scope.getNumberOfElementsForPaging = function() {
        //The backend wants us to stop paginating after 25 pages
        if ($scope.totalItems && $scope.totalItems > ($scope.pageLimit * $scope.itemsPerPage) && $scope.currentPage > 20) {
            return ($scope.pageLimit * $scope.itemsPerPage);
        } else {
            return $scope.totalItems;
        }
    };

    getResultsPage();
});
