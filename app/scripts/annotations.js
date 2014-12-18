// Ajax loading gif

http.get('http://wwwdev.ebi.ac.uk/QuickGO/ws/lookup', {params: {id: 'GO:0006915'}})
    .success(function(data, status, headers, config){
     //populate data
        $scope.annotations = data;
    });


$.ajaxSetup({
    beforeSend: function(){
        $('#loading-image').show();
        $('#advanced-loading-image').show();
    },
    complete: function(){
        $('#loading-image').hide();
        $('#advanced-loading-image').hide();
    }
});

$(document).ready(function() {
		// Hide loading images
		$('#loading-image').hide();
		$('#advanced-loading-image').hide();
		// To save previous state of columns display popup
		var divOrderClone = '';
		// To save previous state of advanced filters popup
		var divAdvancedFilterClone = '';
		// Contains checked options
		var ch = new Array();
		// Hide descendants filtering options
		$("#goIDclosureTypes").hide();
		// Check slim by default
		$("#slim-filtering").prop('checked', true);

		// Button tooltips
		tooltip("#customize-columns-button");
		tooltip("#download-button");
		tooltip("#download-stats-button");
		// Put selected taxonomy as active
		makeSelectedTaxonomyActive();
		// Generate ancestors chart functionality
		generateOntologyGraphFunctionality();
		/*
		 * Tooltip function
		 */
		function tooltip(button){
			$(button).tooltipsy({
				className: 'bubbletooltip_tip',
				offset: [0, 10],
				delay: 1000,
				show: function (e, $el) {
					$el.slideDown(300);
				},
				hide: function (e, $el) {
					 $el.slideUp(300);
				}
			});
		}

		/*
		 *	Make reorder columns panel draggable and sortable
		 */
		function makeColumnsSortable() {
			$("#selectedColumns").sortable({
				revert : false,
				containment : "parent",
				cursor : "crosshair"
			});
			$("#selectedColumns").disableSelection();
		}

		/*
		 *	Delete button action for reordering elements
		 */
		function deleteButtonAction(element){
			//Uncheck checkbox
			var id = element.parent().attr('id');
			id = id.replace("-column-input-selected","");
			$("#" + id).prop('checked', false);
			//Remove element
			element.parent().remove();
		}

		/*
		 *	Add corresponding reorder element for a selected option
		 */
		function appendElement (element){
			$("#selectedColumnsArea ul").append('<li class="selectedColumn ui-content ui-state-default " id="'+element.val()+ '-column-input-selected">'+element.next().text()+'<div class="delete"></div></li>');
			$(".delete").click(function(){
				deleteButtonAction($(this));
			});
		}

		$(function() {
			makeColumnsSortable();
			/*
			 *	  Pagination component
			 */
			 $("#light-pagination").pagination({//More info: http://flaviusmatis.github.io/simplePagination.js
				items: $('input[name=total_number_annotations]').val(),
				currentPage: $('input[name=current_page]').val(),
				itemsOnPage: 25,
				displayedPages: 3,
				edges: 0,
				cssStyle: 'light-theme',
				onPageClick: function doSearch(){
					ajaxPaginationRequest();
				}
			});

			//Action associated to the submit button for displaying options
			$("#submit_options").click(function() {
				ajaxPaginationRequest();
			});

			$("#submit_advanced_filtering").off();
			//Action associated to the submit button for advanced filtering
			$("#submit_advanced_filtering").on("click", function(event) {
				// To avoid adding the "#" at the end of the URL
			    	event.preventDefault();
				ajaxAdvancedFilteringRequest();
			});


			// Show column display options
			$('#customize-columns-button').click(function() {
				//Initialize array checked options
				ch = new Array();
				//Get checked elements
				$('#columns-options :checkbox:checked').each(function() {
					ch.push($(this).val());
				});
				//Reorder panel
				if ($('#selectedColumns').children('li').length == 0) {//Initialize if it's empty
					$('#columns-options :checkbox:checked').each(function() {
						appendElement($(this));
					});
				} else {
					$('#selectedColumns').children('li').each(function(){
						$(this).find('.delete').click(function(){
							deleteButtonAction($(this));
						});
					});
				}
				divOrderClone = $("#selectedColumnsArea").clone();
				$('#column-display-popup').fadeIn('slow');
			});

			// Close column display options
			$('#closeCustomizeColumns').click(function() {
				cancel();
			});
			// Close column display options
			$('#cancel_options').click(function() {
				cancel();
			});

			// Reset column display options
			$('#reset_options').click(function() {
				$('#displayOptions-default :checkbox').each(function() {
					$(this).prop('checked', true);
				});
				$('#displayOptions-others :checkbox').each(function() {
					$(this).prop('checked', false);
				});
				//Reorder panel
				$("#selectedColumns").empty();
				$('#columns-options :checkbox:checked').each(function() {
					appendElement($(this));
				});
			});

			// Checkboxes onChange function
			$('#customizeColumns :checkbox').on('change', function() {
			     if(this.checked) {
				appendElement($(this));
			     } else {
				$('#'+$(this).val()+'-column-input-selected').remove();
			     }
			});

			// Download button
			$('#download-button').click(function() {
				downloadMenu();
			});

			// Download button
			$('#download-stats-button').click(function() {
				downloadStatsMenu();
			});

			// Download options button
			$('#download-menu-go').click(function() {
				downloadAnnotations();
			});

			// Download stats options button
			$('#download-stats-menu-go').click(function() {
				downloadAnnotationsStats();
			});

			// Download options button
			$('#closeDownloadMenu').click(function() {
				$('#download-menu').css("display","none");
			});

			// Close stats options button
			$('#closeDownloadStatsMenu').click(function() {
				$('#download-stats-menu').css("display","none");
			});


			/**
			* ADVANCED FILTERS MENU
			**/
			advancedFiltersButtons();

			/**
			** TERMS ANCESTORS CHART
			**/
			$('#closeGraphPopUp').click(function(event) {
			    // To avoid adding the "#" at the end of the URL
			    event.preventDefault();
	   		    $('#ontology-graph-popup').fadeOut('slow');
  			    $('#ontology-graph-content').css("display","none");
			});

			/*
			* VIEW BY BUTTONS
			*/
			$('#statisticsView').click(function(event) {
	   		    $('#appliedFilters').slideUp();
	   		    $('#quickFiltersMenu').slideUp();
	   		    $('#annotationsMainContent').hide('slide',{direction: 'right'},500);
  			    $('#statisticsMainContent').show('slide',{direction: 'left'},1500);
			    calculateStats();
			});

			$('#resultsTableView').click(function(event) {
	   		    $('#appliedFilters').slideDown();
	   		    $('#quickFiltersMenu').slideDown();
	   		    $('#statisticsMainContent').hide('slide',{direction: 'right'},500);
  			    $('#annotationsMainContent').show('slide',{direction: 'left'},1500);
			});

			/*
			* ANN. EXTENSIONS POP UP
			*/
			$('#closeExtensionMenu').click(function(event) {
				$("#extension-popup").fadeOut('slow');
			});

		});

		// Function to show/hide download dialog
		function downloadMenu(){
			if($('#download-menu').css('display')=="none"){
				$('#download-menu').css("display","block");
			}else{
				$('#download-menu').css("display","none");
			}
		}

		// Function to show/hide download dialog
		function downloadStatsMenu(){
			if($('#download-stats-menu').css('display')=="none"){
				$('#download-stats-menu').css("display","block");
			}else{
				$('#download-stats-menu').css("display","none");
			}
		}

		// Ajax request to download annotations
		function downloadAnnotations(){
			var url = window.location;
			var selectedFormat = $('#format').find(":selected").val();
			var formattedURL = url.href.replace(url.hash,"");
			formattedURL = formattedURL.replace("#","");
			window.location = formattedURL + "?format=" + selectedFormat;
			$('#loading-image').hide();
			$('#download-menu').hide();
		}

		// Ajax request to download annotations stats
		function downloadAnnotationsStats(){
			var categoriesList = '';
			$("input[name=statsCategory]").each(function() {
				if($(this).prop('checked')){
					categoriesList = categoriesList + "," + $(this).val()
				}
			});
			var statsby = $('input[name=statsBy]:checked').val()
			var url = window.location;
			var formattedURL = url.href.replace(url.hash,"");
			formattedURL = formattedURL.replace("#","");
			window.location = formattedURL + "/downloadStats" + "?categories=" + categoriesList + "&statsBy=" + statsby;
			$('#loading-image').hide();
			$('#download-stats-menu').hide();
		}

		/*
			Ajax request sending current page and checked cols
		*/
		function ajaxPaginationRequest(){
            console.log("Make pagination request");
			var page = $("#light-pagination").pagination('getCurrentPage');
			$('input[name=current_page]').val(page);
			//Data to send. Checked columns
			var cols = new Array();
			$('#selectedColumnsArea li').each(function() {
				var id = $(this).attr('id');
				id = id.replace("-column-input-selected","");
				cols.push(id);
			});
			var url = window.location;
			$.ajax({
				type : "GET",
				url : url,
				data : {"page":page, "cols":encodeURIComponent(cols)},
				complete: function(){
	  				$('#column-display-popup').fadeOut('slow');
				},
				success : function(response) {
					// We have the response
					$('#resultsArea').html($(response).find('#resultsArea'));
					$('#pageCount').html($(response).find('#pageCount'));
					$('#loading-image').hide();
				},
				error : function(e) {
					alert('Error: ' + e.responseText);
				}
			});
		}

		/*
		 *	Action for display columns pop up cancel buttons
		 */
		function cancel(){
			$("#selectedColumns").empty();
			$('#columns-options :checkbox').each(function() {
				if($.inArray($(this).val(), ch) > -1){
					$(this).prop('checked', true);
				} else {
					$(this).prop('checked', false);
				}
			});
			$("#selectedColumnsArea").replaceWith(divOrderClone);
			makeColumnsSortable();
			$('#column-display-popup').fadeOut('slow');
		}
});

/*
 * Action for advanced filters cancel buttons
 */
function closeAdvancedFilters() {
	$("#advancedTabsSection").replaceWith(divAdvancedFilterClone);
	$('#advanced-filters-popup').fadeOut('slow');
}

/**
 * Advanced filters buttons
 */
function advancedFiltersButtons() {

	// Close advanced filters menu (cross)
	$('#closeAdvancedFiltersMenu').click(function(event) {
		// To avoid adding the "#" at the end of the URL
		event.preventDefault();
		closeAdvancedFilters();
	});

	// Close advanced filters menu (button)
	$('#cancelAdvancedFiltersMenu').click(function(event) {
		// To avoid adding the "#" at the end of the URL
		event.preventDefault();
		closeAdvancedFilters();
	});

	// Reset column display options
	$('#resetAdvancedFiltersOptions').click(function() {
		$('#advancedFiltersTabs :checkbox').each(function() {
			$(this).prop('checked', false);
		});
		$("#advancedFiltersTabs").find('textarea').each(function() {
			$(this).val("");
		});
	});

	// Advanced filters button
	$('#advanced-filters').click(function() {
		divAdvancedFilterClone = $("#advancedTabsSection").clone();
		$('#advanced-loading-image').hide();
		$("#advancedFiltersTabs").tabs({
			active : 0
		});
		$("#advancedFiltersTabs").tabs("load", 0);
		$('#advanced-filters-popup').fadeIn('slow');
	});
}

/*
 * Action associated to quick filtering button
 */
function quickFilteringButtons(){

	$("#submit_quick_filtering").off();
	//Action associated to the submit button for quick filtering
	$("#submit_quick_filtering").on("click", function() {
		ajaxGPGOIDFilteringRequest();
	});
}

/*
 * Make active selected taxonomy
 */
function makeSelectedTaxonomyActive() {
	var appliedFilters = $("input[name=appliedFiltersValues]").val();
	$("#taxonomyId li").each(function() {
		if (appliedFilters.indexOf($(this).attr("id")) != -1) {
			$(this).addClass("active");
			return;
		}
	});
}

/*
 * Ajax request for quick filtering using taxonomies
 */
function ajaxTaxonomyFilteringRequest() {
	// Data to send. Filtering values
	var map = {};
	map["taxonomyClosure"] = '';
	var activeTaxonomies = '';
	$("#taxonomyId").find(".active").each(function() {
		var id = $(this).attr('id');
		activeTaxonomies = activeTaxonomies + " " + id;
	});
	map["taxonomyClosure"] = activeTaxonomies;
	ajaxFilteringRequest(map, true, false);
}

/*
 * Ajax request for quick filtering using GP and GO ids
 */
function ajaxGPGOIDFilteringRequest() {
	// Data to send. Filtering values
	var filterParameters = new Array();
	$('textarea.filter-value').each(function() {
		var id = $(this).attr('id');
		filterParameters.push(id);
	});

	var map = {};
	for ( var i = 0; i < filterParameters.length; i++) {
		map[filterParameters[i]] = $("#" + filterParameters[i]).val();
	}
	ajaxFilteringRequest(map, false, false);
}

/*
 * Ajax request for advanced filtering
 */
function ajaxAdvancedFilteringRequest() {
	// Data to send. Filtering values
	var map = {};
	$('[class*=advanced-filter]').each(function() {
		var id = $(this).attr('class').replace("advanced-filter-","");
		var value = $(this).val();
							if ((!$(this).is(':checkbox') && !$(this).is(':radio') && !$(this).is('option'))
								|| ($(this).is(':checkbox') && $(this).prop("checked") == true)
								|| ($(this).is(':radio') && $(this).prop("checked") == true)
								|| ($(this).is('option') && $(this).prop("selected") == true)) {
			if(map[id] == null){
				map[id] = value;
			}else{
				var values = map[id];
				map[id] = values + "," + value;
			}
		}
	});

	ajaxFilteringRequest(map, false, true);
}

/**
 * Generic ajax request for filtering
 */
function ajaxFilteringRequest(map,filterByTaxonomy,advanced){

    //Data request
    var url = window.location;
	var formattedURL = url.href.replace(url.hash,"");
	formattedURL = formattedURL.replace("#","");
    console.log("call to filtering " + formattedURL + " on "  + Date());


    $.ajax({
			type : "POST",
			url : formattedURL,
			data : { q:JSON.stringify(map), page:1, advancedFilter:advanced},
			complete: function(){
					if(advanced){
		  				$('#advanced-filters-popup').fadeOut('slow');
					}
				},
			success : function(response) {
				// We have the response
				$('#resultsArea').html($(response).find('#resultsArea'));
				// Update pagination component and number of annotations
				$("#light-pagination").pagination('updateItems', $('input[name=total_number_annotations]').val());
				$("#light-pagination").pagination('selectPage', 1);
				$('#pageCount').html($(response).find('#pageCount'));
				// Left sidebar
				$('#appliedFiltersValuesDiv').html($(response).find('#appliedFiltersValuesDiv'));
				if(!filterByTaxonomy){
					$('#quickFiltersMenu').html($(response).find('#quickFiltersMenu'));
				}
				makeSelectedTaxonomyActive();
				$('#taxonomiesArea').html($(response).find('#taxonomiesArea'));
			},
			error : function(e) {
				alert('Error: ' + e.responseText);
			}
		});
}

/* Get associated annotations for a given filter
   Used for tables in 'Dataset' section
 */
function getAssociatedAnnotations(field, value){
    console.log("call to getAssociatedAnnotations " + Date());
	var map = {};
	map[field] = value;
	$.ajax({
		type : "GET",
		url : contextPath + "/annotation",
		data : {
			q:JSON.stringify(map),page:1, advancedFilter:true
		},
		success : function(response) {
			window.location = contextPath + "/annotation";
		}
	});
}


/**
 * Ontology graph functionality for a single term
 */
function generateOntologyGraphFunctionality() {
	$('.ontologygraph').click(function() {
		var termId = $(this).attr('id').replace("ontologygraph_","");
		var url = window.location;
		var formattedURL = url.href.replace(url.hash,"");
		formattedURL = formattedURL.replace("#","");
		ontologyGraphCall(formattedURL,termId);
	});
}


/**
 * To calculate annotations stats
 */
function calculateStats(){
		var url = window.location;
		var formattedURL = url.href.replace(url.hash,"");
		formattedURL = formattedURL.replace("#","");
        console.log("Call to calculateStats() " + Date());
		$.ajax({
			type : "POST",
			url : formattedURL + "/stats",
			beforeSend: function(){
			    $("#resultActionStatsButtons").hide();
			    $("#statisticsTabs").hide();
			    $('#loading-stats-div').show();
			},
			complete: function(){
			    $("#loading-stats-div").fadeOut('slow');
			    $("#statisticsTabs").fadeIn('slow');
			},
			success : function(response) {
				$('#statsSummary').html($(response).find('#statsSummary'));
				$('#statsGOID').html($(response).find('#statsGOID'));
				$('#statsAspect').html($(response).find('#statsAspect'));
				$('#statsEvidence').html($(response).find('#statsEvidence'));
				$('#statsReference').html($(response).find('#statsReference'));
				$('#statsTaxon').html($(response).find('#statsTaxon'));
				$('#statsAssignedBy').html($(response).find('#statsAssignedBy'));
				$("#resultActionStatsButtons").fadeIn('slow');
			},
			error : function(e) {
				alert('Error: Timeout was reached');
			},
			timeout: 90000
		});
}


// Show pop up with annotation extension information
function showExtension(extensions) {
	$('#extensionMenu').empty();
	var extensionsArray = extensions.split("|");
	for (i = 0; i < extensionsArray.length; i = i + 1) {
		var values = extensionsArray[i].split(",");
		for (j = 0; j < values.length; j = j + 1) {
			$('#extensionMenu').append(
					"<li style='list-style-type: none;'>" + values[j] + '</li>');
		}
		//  $('#extensionMenu').append('</ul>');
		$('#extensionMenu').append(
				"<hr width='300' style='border-color:#9ACEDD'>");
	}
	$("#extension-popup").fadeIn('slow');
}
