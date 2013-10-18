
/*
 *	FUNCTION TO MAKE ME FEEL LESS UNHAPPY
 */
function myFunction() {
	alert("Hello! I am an alert box placed here with the sole purpose of making Euan less sad!");
}

fillCategories();

function createSection(name) { 
	return {
		// main array of data
		stories:[],
	
		/*  --------------------------------------------------
		 *	EXTRACT INDIVIDUAL ITEM
		 */ 
		extractItemFrom: function (items) {
			if (items.length < 1) {
				return;
			}
						
			var story = { 
				id: name,
				summary: items[0].summary,
				lastUpdated: items[0].lastUpdated,
				firstCreated: items[0].firstCreated,
				media: items[0].media,
				assetUri: items[0].assetUri,
				headline: items[0].headline
			};
			
			var re = new RegExp(/\d+$/);
			var id = re.exec(story.assetUri);
			story.id = id;
								
			this.stories.push(story);
		},

		/*  --------------------------------------------------
		 *	GET DATA FROM SECTION INDEX
		 */ 
		extractSectionIndexData: function (data) {
			var results = data.results;
			results = results[0];
	
			var groups = results.groups;
	
			for(var i = 0; i < groups.length; i++) {
				if (groups[i].type === "container-now") {
					var containerGroups = groups[i].groups;
			
					for(var c = 0; c < containerGroups.length; c++) {
						if (typeof containerGroups[c].groups != 'undefined') { 
							var innerGroups = containerGroups[c].groups;
							for (var j = 0; j < innerGroups.length; j++) {
								if (typeof innerGroups[j].items != 'undefined') {
									this.extractItemFrom(innerGroups[j].items);
								}
							}
						} 
					}
				}
			}
		},


		// grabs front page data and dumps it into 'stories[]'
		populate: function (data) { this.stories = []; this.extractSectionData(data); },


/*  --------------------------------------------------
 *	GET SECTION INDEX FUNCTION
 */ 
//getSectionIndex: function (self, section, key) {

//}
	};
}


var topics = {  };
topics['front_page'] = createSection('front_page');
topics['technology'] = createSection('technology');


function fillCategories() {
$.ajax({
		  url: "interface.php?url=http://bbc.api.mashery.com/content/asset/news/" + "front_page" + "?api_key=" + "55e5w5gwnjyfg7z5rd7v8s93",
		  success: function( data ) {
			topics['front_page'].extractSectionIndexData(jQuery.parseJSON(data));
			
			$.ajax({
				url: "interface.php?url=http://bbc.api.mashery.com/content/asset/news/" + "technology" + "?api_key=" + "55e5w5gwnjyfg7z5rd7v8s93",
				success: function( data ) {
					topics['technology'].extractSectionIndexData(jQuery.parseJSON(data));
					//buildHeadlines(frontPage.stories);
				}
			});
		  }
	});
	


}
	
	//$(document).on('click', "div.headline", function() {
function getPreview(id) {
	//	alert(id + " - " + topics);    
    buildPreview(id);
} 

/*  --------------------------------------------------
 *	HEADLINES VIEW: BUILD HEADLINES
 */ 
function buildHeadlines(stories) {
	var items = [];
	$( "#left" ).empty();
	
	
	$.each( stories, function( key, val ) {
		items.push( "<div class='headline' id='" + val.id + "' onclick='getPreview(" + val.id + ")'>" + val.headline + "</div>" );
	});
 
	$( "<div/>", {
		"class": "headlineset",
		html: items.join( "" )
	}).appendTo( "#left" );
}




/*  --------------------------------------------------
 *	HEADLINES VIEW: DISPLAY PREVIEW
 */ 
function buildPreview(id) {
			  $("#previewbox").empty();
	$.each(topics, function() {
	
	
	$.each(this.stories, function( key, val ) {
	//alert();
	//alert(stories[0].assetUri);
	//alert(val.id + " - " + id);
	//alert(this.assetUri);
		if(this.assetUri.substring(this.assetUri.length - 8, this.assetUri.length) == id) {
			  var previewElements = [];
			  previewElements.push("<div id='preview_headline'>" +val.headline+ "</div>");
			  previewElements.push("<div id='preview_lastupdated'>" +val.lastUpdated+ "</div>");
			  previewElements.push("<div id='preview_summary'>" +val.summary+ "</div>");
			  //previewElements.push("<div id='preview_thumb'>" + val.media.images[1] + "</div>" );
 			  //alert( "<div id='" + val.assetUri + "_THUMB'>" + val.media.images + "</div>" );
 
			  $( "<div/>", {
				"class": "previewset",
				html: previewElements.join( "" )
			  }).appendTo( "#previewbox" );
		}
	});
	
	});
}

/*
$( document ).ready(function() {
	//$( "#mybutton" ).click(function() {
		//buildHeadlines();
		alert(frontPage.stories.length);
		buildHeadlines(frontPage.stories);
	//});
});
*/

   
//});

$( document ).ready(function() {
	$( "svg" ).click(function() {
		//buildHeadlines();
		//alert();
		//buildHeadlines(frontPage.stories);
	});
});
