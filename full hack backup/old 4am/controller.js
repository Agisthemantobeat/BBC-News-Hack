
/*
 *	FUNCTION TO MAKE ME FEEL LESS UNHAPPY
 */
function myFunction() {
	alert("Hello! I am an alert box placed here with the sole purpose of making Euan less sad!");
}

function createSection() { 
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
				summary: items[0].summary,
				lastUpdated: items[0].lastUpdated,
				firstCreated: items[0].firstCreated,
				media: items[0].media,
				assetUri: items[0].assetUri,
				headline: items[0].headline
			};					
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



var frontPage = createSection();
var technology = createSection();

$.ajax({
		  url: "http://euanmorrison.co.uk/newshack/euan/interface.php?url=http://bbc.api.mashery.com/content/asset/news/" + "front_page" + "?api_key=" + "55e5w5gwnjyfg7z5rd7v8s93",
		  success: function( data ) {
			frontPage.extractSectionIndexData(jQuery.parseJSON(data));
		  }
	});
	

$.ajax({
		  url: "http://euanmorrison.co.uk/newshack/euan/interface.php?url=http://bbc.api.mashery.com/content/asset/news/" + "technology" + "?api_key=" + "55e5w5gwnjyfg7z5rd7v8s93",
		  success: function( data ) {
			technology.extractSectionIndexData(jQuery.parseJSON(data));
		  }
	});


/*  --------------------------------------------------
 *	HEADLINES VIEW: BUILD HEADLINES
 */ 
function buildHeadlines(stories) {
	var items = [];
	$.each( stories, function( key, val ) {
		items.push( "<div class='headline' id='" + val.assetUri + "'>" + val.headline + "</div>" );
	});
 
	$( "<div/>", {
		"class": "headlineset",
		html: items.join( "" )
	}).appendTo( "#left" );
}




/*  --------------------------------------------------
 *	HEADLINES VIEW: DISPLAY PREVIEW
 */ 
function buildPreview(stories,uri) {
	$.each( stories, function( key, val ) {
		if(val.assetUri == uri) {
			  var previewElements = [];
			  //previewElements.push( "<div id='" + val.assetUri + "_THUMB'>" + val.media.images.index-thumbnail[0] + "</div>" );
 			  alert( "<div id='" + val.assetUri + "_THUMB'>" + val.media.images + "</div>" );

 
			  $( "<div/>", {
				"class": "headlineset",
				html: previewElements.join( "" )
			  }).appendTo( "#right" );
		}
	});
}

$( document ).ready(function() {
	$( "#mybutton" ).click(function() {
		//buildHeadlines();
		buildHeadlines(technology.stories);
	});
});

$(document).on('click', "div.headline", function() {
    alert(this.id);    
    buildPreview(technology.stories,this.id);    
});
