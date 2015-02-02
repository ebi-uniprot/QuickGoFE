$(document).ready(function() {
			
			// Highlight secondary ID
			var goId = window.location.href.split('GO:')[1];
			$('#secondariesColumn').highlight('GO:' + goId);
			
			// Clicks on left sidebar checkboxes
			$("#entry_sections input:checkbox").click(function() {
				if (this.checked) {
					$(this).parents("li").first().addClass('active');
					$(this).prop("checked", true);
					$("#" + this.id.replace("checkbox", "section")).show();
				} else {
					$(this).parents("li").first().removeClass('active');
					$(this).prop("checked", false);
					$("#" + this.id.replace("checkbox", "section")).hide();
				}
			});

			// Click events on left sidebar to navigate through the different sections of the term
			$("#entry_sections span").click(function() {
				var prev = $(this).prev();
				if (prev.prop("checked")) {
					$('html, body').animate({
						scrollTop : $("#" + this.id + "-section").offset().top
					}, 1000);
				}
			});

			floatSidebar();

			/**
			 * Float left sidebar
			 */
			function floatSidebar() {
				// Floating
				var msie6 = $.browser == 'msie' && $.browser.version < 7;

				if (!msie6) {
					var sidebarTop = $('#entrySidebar').offset().top
							- parseFloat($('#entrySidebar').css('margin-top')
									.replace(/auto/, 0));

					$(window).scroll(function(event) {
						// what the y position of the scroll is
						var y = $(this).scrollTop();
						// get current entry sidebar width
						var width = $("#entrySidebar").width();						
						// whether that's below the form
						if (y >= sidebarTop) {							
							// if so, ad the fixed class
							$('#entrySidebar').css("width", width  + "px");
							$('#entrySidebar').addClass('fixed');
							$('.mainContent').addClass('push_2');
						} else {
							// otherwise remove it
							$('#entrySidebar').removeClass('fixed');
							$('.mainContent').removeClass('push_2');
							$('#entrySidebar').css("width", "");
						}
					});
				}
			}
});


/*
 * Action associated to "Show annotations" button in term page
 */
function showTermAnnotationsButton() {

	$("#show-term-annotations").off();
	//Action associated to the submit button for quick filtering
	$("#show-term-annotations").on("click", function() {
		filterByGOID($(this).attr("value"));
	});
}

function filterByGOID(goID) {
	//Remove previous filters	
	//Set GO id as filter
	var map = {};
	map["goID"] = goID;	
	$.ajax({
		type : "GET",
		url : contextPath + "/annotation",		
		data : {
			q : JSON.stringify(map),
			page : 1,
			advancedFilter : false,
			removeAllFilters : true
		},
		success : function(response) {	
			window.location = contextPath + "/annotation";		
			// We have the response
			$('#resultsArea').html($(response).find('#resultsArea'));
			// Left sidebar
			$('#appliedFiltersValuesDiv').html(
					$(response).find('#appliedFiltersValuesDiv'));
			$('#quickFiltersMenu').html($(response).find('#quickFiltersMenu'));
			// Update pagination component and number of annotations
			$("#light-pagination").pagination('updateItems',
					$('input[name=total_number_annotations]').val());
			$("#light-pagination").pagination('selectPage', 1);
			$('#pageCount').html($(response).find('#pageCount'));
		},
		error : function(xhr, status, error) {
			  var err = eval("(" + xhr.responseText + ")");
			  alert(err.Message);
		}
	});
}