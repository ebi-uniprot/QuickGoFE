/**
 * Common Javascript functions
 */

/**
* Close pop ups with ESC key
*/

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        $("#advanced-filters-popup").fadeOut('slow');
        $("#ontology-graph-popup").fadeOut('slow');
    }
});


// Update terms basket session value
updateTermBasketSessionValue();

$(document).ready(function() {	

	// Add list of terms to basket button
	addListTermsToBasketFunctionality();
	
	//Basket buttons functionality
	setBasketButtonsFunctionality();

	// Basket button
	$('#basket').click(function() {
		basket();			
	});
	// Close basket dialog
	$('#closeBasket').click(function() {
		$('#basket-contents').css("display","none");
	});

	/*
	* SLIMMING POP UP
	*/
	// Open slimming popup
	$('#slims').click(function() {
		$('#slimming-popup').fadeIn("slow");
	});

	// Close slimming popup
	$('#closeSlimmingMenu').click(function() {
		$('#slimming-popup').fadeOut("slow");
	});

	// Close slimming graph popup
	$('#closeSlimmingGraphMenu').click(function() {
		$('#slimming-graph-popup').fadeOut("slow");
	});
	
	// Close Bookmarkable link popup
	$('#closeLinkMenu').click(function() {
		$('#bookmarkable-link-menu').fadeOut("slow");
	});
	
	// Search button
	$('#search-button').click(function() {
		if($.trim($("#query").val().length) > 0){//query text is not empty
			search();
		}
	});
	// Search also when "enter" key is pressed
	$('#query').keypress(function(e){
		if(e.which == 13){//Enter key pressed
		    $('#search-button').click();//Trigger search button click event
		}
	});
	
	$(function() {
	
		$("#light-search-pagination").pagination({//More info: http://flaviusmatis.github.io/simplePagination.js
			items: $('input[name=total_number_results]').val(),
			currentPage: $('input[name=search_current_page]').val(),
			itemsOnPage: 25,
			displayedPages: 3,
			edges: 0,
			cssStyle: 'light-theme',				
			onPageClick: function doSearch(){
				ajaxSearchPaginationRequest();			   				
			} 
		});

	});
});


/*
Ajax request for search results page sending current page
*/
function ajaxSearchPaginationRequest(){
	var page = $("#light-search-pagination").pagination('getCurrentPage');
	$('input[name=search_current_page]').val(page);
	var url = window.location;	
	$.ajax({
		type : "GET",
		url : url,
		data : {"page":page},
		success : function(response) {
			// We have the response															
			$('#searchResultsArea').html($(response).find('#searchResultsArea'));
			$('#searchPageCount').html($(response).find('#searchPageCount'));
			$('#loading-image').hide();
		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});
}

/**
* Basket buttons functionality
*/
function setBasketButtonsFunctionality(){

	// Clear all basket terms
	$('#clear-basket-button').click(function() {
		$.cookie('basket-items', "");
		removeTermsFromBasket("all");
	});
			
	// Clear all basket terms
	$('#view-basket-annotations').click(function() {
		alert("View annotations");
	});

}

// Function to display/hide basket content
function basket(){
	if($('#basket-contents').css('display')=="none"){
		$('#basket-contents').css("display","block");
	}else{
		$('#basket-contents').css("display","none");
	}
}

/**
 * To add a list of terms to the basket 
 */
function addListTermsToBasketFunctionality() {
	$('#add-list-terms-button').on(
		'click',
		function() {
			var termsToAdd = $("#termsListToAdd").val().replace(","," ").split(/\s+/);
			var termsToAddCommaSeparated = "";
			for(i=0;i < termsToAdd.length;i++){
				var termID = termsToAdd[i].trim().replace("\n","");
				termsToAddCommaSeparated = termsToAddCommaSeparated + "," + termID;
				if ($.cookie('basket-items') == null) {
					$.cookie('basket-items', termID, { expires: 5 });//Create cookie (expires in 5 days) and add value
				} else {
					var values = $.cookie('basket-items',String);
					if (values.indexOf(termID) == -1) {// The term hasn't been added yet
						$.cookie('basket-items', values + "," + termID, { expires: 5 });
					}
				}
			}			
			addTermsToBasketAjaxCall(termsToAddCommaSeparated);
			$("#termsListToAdd").val("");
		}
	);
}

/**
* To remove terms from basket terms
*/
function removeTermFromBasketFunctionality(){
		$('.remove-term').on(
			'click',
			function() {
					var termID = $(this).attr('id').replace("remove_term_", "");
					var values = $.cookie('basket-items',String);
					values = values.replace(termID,"");
					$.cookie('basket-items', values);
					$('input[name=basket_terms]').val($.cookie('basket-items'));										
					removeTermsFromBasket(termID);					
		});
}

/**
* Refresh hidden value of terms added to the basket
*/
function refreshBasketTerms(){
	$('input[name=basket_terms]').val($.cookie('basket-items'));
}

/**
* Update session attribute according values stored in cookie
*/
function updateTermBasketSessionValue(){
	var url = window.location;
	var formattedURL = url.href.replace(url.hash,"");
	formattedURL = formattedURL.replace("#","");
	$.ajax({
		type : "GET",
		url : formattedURL,
		data: {"addTerm":$.cookie('basket-items'),"page":1},
		success : function(response) {
			// We have the response
			$('#basket').html($(response).find("#basket"));							
			$('#resultsArea').html($(response).find("#resultsArea"));
			$('#filledBasketContents').html($(response).find("#filledBasketContents"));
			$('#addedTermsToBasket').html($(response).find("#addedTermsToBasket"));//Terms list in filtering by GO ID
			$('#basket-actions').html($(response).find("#basket-actions"));
			$('#slimming_basket_terms').html($(response).find("#slimming_basket_terms"));
		}
	});
}


/**
 * Remove term/terms from basket
 */
function removeTermsFromBasket(termID){
	var page = 1;
	try {
		page = $("#light-pagination").pagination('getCurrentPage');
	} catch (err) {

	}
	var url = window.location;					
	var formattedURL = url.href.replace(url.hash,"");
	formattedURL = formattedURL.replace("#","");
	$.ajax({
		type : "GET",
		url : formattedURL,
		data: {"removeTerm":termID, "page":page},
		success : function(response) {
			// We have the response							
			$('#basket').html($(response).find("#basket"));							
			if(formattedURL.indexOf("annotation") != -1){//Only refresh annotations area
				$('#resultsArea').html($(response).find("#resultsArea"));
			}else if(formattedURL.indexOf("term") != -1){// Disable add term to basket button
				$('#add-to-basket-div').html($(response).find("#add-to-basket-div"));
			}
			$('#filledBasketContents').html($(response).find("#filledBasketContents"));
			$('#basket-actions').html($(response).find("#basket-actions"));
			$('#basket-contents').css("display","block");
			$('#slimming_basket_terms').html($(response).find("#slimming_basket_terms"));
		}
	});
}

/**
 * Add term to basket icon
 */
function addTermsToBasketFunctionality() {
	// Basket icon next to each go term
	$('.add-basket-item').on(
			'click',
			function() {
				if ($(this).hasClass("enabled")) {
					var termID = $(this).attr('id').replace("term_", "");
					if ($.cookie('basket-items') == null) {
						$.cookie('basket-items', termID, { expires: 5 });//Create cookie (expires in 5 days) and add value
					} else {
						var values = $.cookie('basket-items',String);
						if (values.indexOf(termID) == -1) {// The term hasn't been added yet
							$.cookie('basket-items', values + "," + termID, { expires: 5 });
						}
					}					
					$('input[name=basket_terms]').val($.cookie('basket-items'));										
					addTermsToBasketAjaxCall(termID);	
				}
			});
}


/**
 * Ajax request to to add a term/list of terms to the basket 
 */
function addTermsToBasketAjaxCall(termID){
	var page = 1;
	try{
		page = $("#light-pagination").pagination('getCurrentPage');
	}catch(err){
							
	}
	var url = window.location;
	var formattedURL = url.href.replace(url.hash,"");
	formattedURL = formattedURL.replace("#","");
	$.ajax({
		type : "GET",						
		url : formattedURL,
		data: {"addTerm":termID, "page":page},
		success : function(response) {
			// We have the response
			$('#basket').html($(response).find("#basket"));
			$('#filledBasketContents').html($(response).find("#filledBasketContents"));
			if(formattedURL.indexOf("annotation") != -1){//Only refresh annotations area
				$('#resultsArea').html($(response).find("#resultsArea"));
			}else if(formattedURL.indexOf("term") != -1){// Disable add term to basket button
				$('#add-to-basket-div').html($(response).find("#add-to-basket-div"));
			}		
			$('#addedTermsToBasket').html($(response).find("#addedTermsToBasket"));//Terms list in filtering by GO ID
			$('#basket-actions').html($(response).find("#basket-actions"));
			$('#slimming_basket_terms').html($(response).find("#slimming_basket_terms"));
		}
	});
}


/**
 * Ontology graph functionality for basket terms
 */
function generateTermsBasketOntologyGraphFunctionality() {
	$('#display-terms-graph-basket').click(function() {	
		var termId = "allBasketTerms";							
		var formattedURL = contextPath + "/annotation";	
		ontologyGraphCall(formattedURL,termId);
	});
}

/**
* Ontology graph call
*/
function ontologyGraphCall(formattedURL,termId){
		$.ajax({
			type : "GET",
			url : formattedURL,
			data: {"graphTermsIds":termId, "relations":"ISA"},
			success : function(response) {				
				$('#ontology-graph-content').css("display","block");
				$("#ontology-graph-popup").fadeIn('slow');
				$('#ancestors-graph-image-div').html($(response).find("#ancestors-graph-image-div"));
				$('#ancestorsGraphImage').css('max-width','');
				var wWidth = $(window).width();				
				var graphWidth = $('#graphImageWidth').val();				
				var wHeight = $(window).height();				
				var graphHeight = $('#graphImageHeight').val();				
				if(graphHeight > wHeight){					
					$('#ontology-graph-content').css('top', '20px');
					$('#ontology-graph-content').css('bottom', '20px');
					$('#ancestors-graph-image-div').css('max-height',(wHeight - 200)  +'px');					
				}else{
					$('#ontology-graph-content').css('top',(wHeight - graphHeight)/ 2 +'px');
					$('#ontology-graph-content').css('bottom', '');
					$('#ancestors-graph-image-div').css('max-height','');					
				}
				if(graphWidth > wWidth){										
					$('#ontology-graph-content').css('left', '20px');
					$('#ontology-graph-content').css('right', '20px');
					$('#ancestors-graph-image-div').css('max-width',(wWidth - 200)  +'px');
				}else{
					$('#ontology-graph-content').css('left',(wWidth - graphWidth)/ 2 +'px');
					$('#ontology-graph-content').css('right', '');
					$('#ancestors-graph-image-div').css('max-width','');
				}
			}
		});
}
/**
 * Retrieve a graph image from the server
 * @param graphImageSrc
 */

function getGraphImage(graphImageSrc,ancestorsGraph) {
	$.ajax({
		url : graphImageSrc,
		type : "GET",
		success : function(data) {
			if(ancestorsGraph){
				$("#ancestorsGraphImage").attr("src","data:image/png;base64, " + data);
			}else{
				$("#ontologyGraphImage").attr("src","data:image/png;base64, " + data);
			}
			
		},
		error : function(jqXHR, textStatus, errorThrow) {
			debugger;
		}
	});
}

/*
 * Help tooltips for relations in ancestors graph
 */

function formattedTooltip(element) {
	var content = element;
	if (element == 'is_a') {
		content = "Term A <strong>is_a</strong> term B means that term A is a subtype of term B.<br/>For example, 'transcription' is a type of 'nucleic acid metabolic process'.";
	} else if (element == 'part_of') {
		content = "Term A <strong>part_of</strong> term B means that term A is always a part of term B.<br/>For example, 'transcription' is always a part of 'gene expression'.";
	} else if (element == 'regulates') {
		content = "Term A <strong>regulates</strong> term B means that term A regulates term B, but term B may not always be regulated by term A.";
	} else if (element == 'positively_regulates') {
		content = "A sub-relation of the 'regulates' relationship.<br/>Term A <strong>positively_regulates</strong> term B means that term B is positively regulated by term A.";
	} else if (element == 'negatively_regulates') {
		content = "A sub-relation of the 'regulates' relationship.<br/>Term A <strong>negatively_regulates</strong> term B means that term B is negatively regulated by term A.";
	} else if (element == 'has_part') {
		content = "<strong>has_part</strong> means that term B always has as part of it term A, but term A may exist independently of term B.<br/>For example, 'protein binding trancription factor activity' always has as a part of it 'protein binding' but 'protein binding' may occur independently of transcription factor activity.<br/>Note that has_part is not a transitive relationship, meaning there is NO implication that gene products annotated to term A could also be correctly associated with term B or any of its parent terms.<br/>Has_part should be read in the opposite direction to the other relationships.";
	} else if (element == 'occurs_in') {
		content = "This relation is used for inter-ontology links between the Biological Process ontology and the Cellular Component ontology, for example 'mitochondrial translation' occurs_in 'mitochondrion'.";
	} else if (element == 'used_in'){
		content = "Documentation coming shortly...";
	}

	$("#" + element).tooltipsy({
		alignTo : 'cursor',
		className : 'helpgraphstooltip_tip',
		delay : 500,
		show : function(e, $el) {
			$el.slideDown(300);
		},
		hide : function(e, $el) {
			$el.slideUp(300);
		},
		content : content
	});
}

/**************/
/** SLIMMING **/
/**************/

/**
* Add own terms
*/
function addOwnTerms(ids) {
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	$.ajax({
		type : "POST",
		url : formattedURL,
		data : {
			ownTerms : ids
		},
		success : function(response) {
			$("#slimming_own_terms").val("");
			$('#bp_section').html($(response).find('#bp_section'));
			$('#mf_section').html($(response).find('#mf_section'));
			$('#cc_section').html($(response).find('#cc_section'));

			$('#bp_graph_section').html($(response).find('#bp_graph_section'));
			$('#mf_graph_section').html($(response).find('#mf_graph_section'));
			$('#cc_graph_section').html($(response).find('#cc_graph_section'));
		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});
}	

/**
* Add basket terms
*/
function addBasketTerms() {
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	var ids = '';
	$('[name=basket_values_slimming]').each(function() {
		var value = $(this).val();
		if ($(this).prop("checked") == true) {
			ids = value + ',' + ids;
		}
	});
	$.ajax({
		type : "POST",
		url : formattedURL,
		data : {
			basketTerms : ids
		},
		success : function(response) {
			$('#bp_section').html($(response).find('#bp_section'));
			$('#mf_section').html($(response).find('#mf_section'));
			$('#cc_section').html($(response).find('#cc_section'));
			$('#bp_graph_section').html($(response).find('#bp_graph_section'));
			$('#mf_graph_section').html($(response).find('#mf_graph_section'));
			$('#cc_graph_section').html($(response).find('#cc_graph_section'));
		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});

}	

/**
* Add predefined slim sets
*/
function addPredefinedSetsTerms() {
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	var selectedSet = '';
	$('[name=set_values_slimming]').each(function() {
		var value = $(this).val();
		if ($(this).prop("checked") == true) {
			selectedSet = value;
		}
	});
	$.ajax({
		type : "POST",
		url : formattedURL,
		data : {
			set : selectedSet
		},
		success : function(response) {
			$('#bp_section').html($(response).find('#bp_section'));
			$('#mf_section').html($(response).find('#mf_section'));
			$('#cc_section').html($(response).find('#cc_section'));
			$('#bp_graph_section').html($(response).find('#bp_graph_section'));
			$('#mf_graph_section').html($(response).find('#mf_graph_section'));
			$('#cc_graph_section').html($(response).find('#cc_graph_section'));
			$('[name=set_values_slimming]').attr('disabled', 'disabled');// disable
																			// options
		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});

}

/**
 * Checboxes onchage event
 */
function activeInactiveEvent() {
	$('#selected_slimming_terms :checkbox').on('change', function() {
		var id = $(this).val();
		var url = window.location;
		var formattedURL = url.href.replace(url.hash, "");
		formattedURL = formattedURL.replace("#", "");
		if (this.checked) {
			activateTerm(id);
		} else {
			inactivateTerm(id);
		}
	});
}

/**
* Activate a term
*/
function activateTerm(id) {
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	$.ajax({
		type : "POST",
		url : formattedURL,
		data : {
			activeSlimmingTermId : id
		},
		success : function(response) {
			// $('#selected_slimming_terms').html($(response).find('#selected_slimming_terms'));
			$('#bp_section').html($(response).find('#bp_section'));
			$('#mf_section').html($(response).find('#mf_section'));
			$('#cc_section').html($(response).find('#cc_section'));
		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});
}

/**
* Inactivate a term
*/
function inactivateTerm(id) {
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	$.ajax({
		type : "POST",
		url : formattedURL,
		data : {
			inactiveSlimmingTermId : id
		},
		success : function(response) {
			// $('#selected_slimming_terms').html($(response).find('#selected_slimming_terms'));
			$('#bp_section').html($(response).find('#bp_section'));
			$('#mf_section').html($(response).find('#mf_section'));
			$('#cc_section').html($(response).find('#cc_section'));
		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});
}
		

/**
* Graph checboxes onchage event
*/
function activeInactiveGraphEvent() {
	$('#selected_graph_slimming_terms :checkbox').on('change', function() {
		var id = $(this).val();
		var url = window.location;
		var formattedURL = url.href.replace(url.hash, "");
		formattedURL = formattedURL.replace("#", "");
		if (this.checked) {
			activateGraphTerm(id);
		} else {
			inactivateGraphTerm(id);
		}
		ontologySlimmingGraphCall(formattedURL, "slimming");
	});
}


/**
* Activate a term in the graph popup
*/
function activateGraphTerm(id) {
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	$.ajax({
		type : "POST",
		url : formattedURL,
		data : {
			activeSlimmingGraphTermId : id
		},
		success : function(response) {
			// $('#selected_slimming_terms').html($(response).find('#selected_slimming_terms'));
			$('#bp_graph_section').html($(response).find('#bp_graph_section'));
			$('#mf_graph_section').html($(response).find('#mf_graph_section'));
			$('#cc_graph_section').html($(response).find('#cc_graph_section'));
		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});
}

/**
 * Inactivate a term in graph popup
 */
function inactivateGraphTerm(id) {
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	$.ajax({
		type : "POST",
		url : formattedURL,
		data : {
			inactiveSlimmingGraphTermId : id
		},
		success : function(response) {
			// $('#selected_slimming_terms').html($(response).find('#selected_slimming_terms'));
			$('#bp_graph_section').html($(response).find('#bp_graph_section'));
			$('#mf_graph_section').html($(response).find('#mf_graph_section'));
			$('#cc_graph_section').html($(response).find('#cc_graph_section'));

		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});
}
		


/**
 * Ontology graph call
 */
function ontologySlimmingGraphCall(formattedURL, termId) {
	$.ajax({
		type : "GET",
		url : formattedURL,
		data : {
			"graphTermsIds" : termId,
			"relations" : "ISA"
		},
		success : function(response) {
			$('#slimming-ancestors-graph-image-div').html(
					$(response).find("#slimming-ancestors-graph-image-div"));
		}
	});
}


/**
* Remove all added terms
*/
function clearSlimming() {
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	$.ajax({
		type : "POST",
		url : formattedURL,
		data : {
			removeAll : "true"
		},
		success : function(response) {
			$('#slimming_own_terms').val('');
			//$('#slimming_basket_terms').html($(response).find('#slimming_basket_terms'));
			$('[name=set_values_slimming]').removeAttr('disabled');
			$('#slimming_set_terms').html($(response).find('#slimming_set_terms'));
			$('#bp_graph_section').html($(response).find('#bp_graph_section'));
			$('#mf_graph_section').html($(response).find('#mf_graph_section'));
			$('#cc_graph_section').html($(response).find('#cc_graph_section'));
			$("#slimmingOntologyGraphImage").attr("src","");
			$('#bp_section').html($(response).find('#bp_section'));
			$('#mf_section').html($(response).find('#mf_section'));
			$('#cc_section').html($(response).find('#cc_section'));

		},
		error : function(e) {
			alert('Error: ' + e.responseText);
		}
	});
}

/**
 * Retrieve a graph image from the server
 * 
 * @param graphImageSrc
 */

function getSlimmingGraphImage(graphImageSrc,ancestorsGraph) {
	$.ajax({
		url : graphImageSrc,
		type : "GET",
		success : function(data) {
			if(ancestorsGraph){
				$("#slimmingOntologyGraphImage").attr("src","data:image/png;base64, " + data);
			}else{
				$("#slimmingOntologyGraphImage").attr("src","data:image/png;base64, " + data);
			}
			
		},
		error : function(jqXHR, textStatus, errorThrow) {
			debugger;
		}
	});
}
/**
 * Show slimming graph popup
 */
function showSlimmingGraph() {
	ontologySlimmingGraphCall(window.location, "slimming");
	$('#slimming-graph-popup').fadeIn('slow');
}

/**
 * Runs actual slimming process
 */
function slim() {
	// Disable mosue on popup
	$("#slimming-popup-content").css("pointer-events", "none");
	var url = window.location;
	var formattedURL = url.href.replace(url.hash, "");
	formattedURL = formattedURL.replace("#", "");
	var proteinsIds = $("#slimming_protein_ids").val();
	var proteinsSets = '';
	$('[name=sliming-proteinset-filter]').each(function() {
		var value = $(this).val();
		if ($(this).prop("checked") == true) {
			proteinsSets = value + ',' + proteinsSets;
		}
	});
	$.ajax({
		type : "GET",
		url : formattedURL,
		data : {
			"slim" : "true", "proteinIds":proteinsIds, "proteinSets":proteinsSets
		},
		success : function(response) {		
			$("#slimming-popup-content").css("pointer-events", "auto");// Enable mouse
			$("#slimming-popup").fadeOut("slow");
			window.location = contextPath + "/annotation";
		}
	});
}

/**
 * To enable autocomplete on search boxes
 * @param fieldId Search box id
 */
function enableAutocomplete(fieldId) {
	$("#" + fieldId).autocomplete(
			{
				messages : {
					noResults : '',
					results : function() {
					}
				},
				source : function(request, response) {
					var url = contextPath + "/autoSuggestByName";
					$.ajax({
						type : "GET",
						url : url,
						data : {
							q : request.term,
						},
						contentType: "charset=utf-8",
						dataType : "json",
						success : function(data) {
							response($.map(data, function(item) {
								var itemLabel = "";
								var itemValue =  "";
								if(item.hasOwnProperty("id")){//term
									itemLabel = item.id + " " + item.name;
									itemValue = item.id;
								}else if(item.hasOwnProperty("dbObjectId")){//gene product
									itemLabel = item.dbObjectId + " " + item.dbObjectName;
									itemValue = item.id;								
								}
								return {
									label : itemLabel,
									value : itemValue
								}
							}));
						}
					});
				},
				focus : function(event, ui) {// not to show anything when mouse over
					//$("#" + fieldId).val(ui.item.label);
					return false;
				},
				_renderItem: function( ul, item ) {
					 return $( "<li>" )
					.attr( "data-value", item.value )
					.append( $( "<a>" ).html( item.label ) )
					.appendTo( ul );
				},
				minLength : 2
				}).data("ui-autocomplete")._renderItem = function(ul, item) {// highlight
					var term = this.element.val();
					var html = item.label;
					var words = term.split(/[ ,]+/);
					for ( var i = 0; i < words.length; i++) {
						if (words[i].trim().length > 0) {
							var textToReplace = new RegExp("("	+ $.ui.autocomplete.escapeRegex(words[i]) + ")", 'gi');
							html = html.replace(textToReplace, "<strong>$1</strong>");
						}
					}
					return $("<li></li>").data("item.autocomplete", item).append(
							$("<a></a>").html(html)).appendTo(ul);
				};
}


function search() {
	var map = {};
	var text = $("#query").val();
	if (text.indexOf("GO:") == 0) {
		window.location.href = contextPath + "/term/" + text.substring(0, 11);
	} else if (text.indexOf("ECO:") == 0) {
		window.location.href = contextPath + "/term/" + text.substring(0, 12);		
	} else if (isUniprotAccession(text)){//protein		
		map["dbObjectId"] = text;
		searchCall(map, true);		
	}else{ //text
		map["text"] = text;
		window.location = contextPath + "/search?query=" + JSON.stringify(map) + "&isProtein=false";
		$('#searched_text').html($(response).find('#searched_text'));
		$('#searchResultsArea').html($(response).find('#searchResultsArea'));
		$("#light-search-pagination").pagination('updateItems', $('input[name=total_number_results]').val());
		$("#light-search-pagination").pagination('selectPage', 1);
		$('#searchPageCount').html($(response).find('#searchPageCount'));
	}	
}

function searchCall(map,protein){	
	$.ajax({
		type : "GET",
		url : contextPath + "/search",
		data : {
			query:JSON.stringify(map), isProtein:protein
		},
		success : function(response) {
			if(protein){				
				window.location = contextPath + "/annotation";
			}
		}
	});
}

function isUniprotAccession(text){
	return text.match(/([OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z]([0-9][A-Z][A-Z0-9]{2}){1,2}[0-9])((-[0-9]+)|:PRO_[0-9]{10}|:VAR_[0-9]{6}){0,1}$/);
}