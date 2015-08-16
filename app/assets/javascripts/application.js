// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


// application js


//
			window._wpemojiSettings = {"baseUrl":"http:\/\/s.w.org\/images\/core\/emoji\/72x72\/","ext":".png","source":{"concatemoji":"http:\/\/garage.cmsmasters.net\/wp-includes\/js\/wp-emoji-release.min.js?ver=4.2.2"}};
			!function(a,b,c){function d(a){var c=b.createElement("canvas"),d=c.getContext&&c.getContext("2d");return d&&d.fillText?(d.textBaseline="top",d.font="600 32px Arial","flag"===a?(d.fillText(String.fromCharCode(55356,56812,55356,56807),0,0),c.toDataURL().length>3e3):(d.fillText(String.fromCharCode(55357,56835),0,0),0!==d.getImageData(16,16,1,1).data[0])):!1}function e(a){var c=b.createElement("script");c.src=a,c.type="text/javascript",b.getElementsByTagName("head")[0].appendChild(c)}var f,g;c.supports={simple:d("simple"),flag:d("flag")},c.DOMReady=!1,c.readyCallback=function(){c.DOMReady=!0},c.supports.simple&&c.supports.flag||(g=function(){c.readyCallback()},b.addEventListener?(b.addEventListener("DOMContentLoaded",g,!1),a.addEventListener("load",g,!1)):(a.attachEvent("onload",g),b.attachEvent("onreadystatechange",function(){"complete"===b.readyState&&c.readyCallback()})),f=c.source||{},f.concatemoji?e(f.concatemoji):f.wpemoji&&f.twemoji&&(e(f.twemoji),e(f.wpemoji)))}(window,document,window._wpemojiSettings);
		


// second

jQuery(document).ready(function() {
				// CUSTOM AJAX CONTENT LOADING FUNCTION
				var ajaxRevslider = function(obj) {
				
					// obj.type : Post Type
					// obj.id : ID of Content to Load
					// obj.aspectratio : The Aspect Ratio of the Container / Media
					// obj.selector : The Container Selector where the Content of Ajax will be injected. It is done via the Essential Grid on Return of Content
					
					var content = "";

					data = {};
					
					data.action = 'revslider_ajax_call_front';
					data.client_action = 'get_slider_html';
					data.token = 'bd0ead0520';
					data.type = obj.type;
					data.id = obj.id;
					data.aspectratio = obj.aspectratio;
					
					// SYNC AJAX REQUEST
					jQuery.ajax({
						type:"post",
						url:"#",
						dataType: 'json',
						data:data,
						async:false,
						success: function(ret, textStatus, XMLHttpRequest) {
							if(ret.success == true)
								content = ret.data;								
						},
						error: function(e) {
							console.log(e);
						}
					});
					
					 // FIRST RETURN THE CONTENT WHEN IT IS LOADED !!
					 return content;						 
				};
				
				// CUSTOM AJAX FUNCTION TO REMOVE THE SLIDER
				var ajaxRemoveRevslider = function(obj) {
					return jQuery(obj.selector+" .rev_slider").revkill();
				};

				// EXTEND THE AJAX CONTENT LOADING TYPES WITH TYPE AND FUNCTION
				var extendessential = setInterval(function() {
					if (jQuery.fn.tpessential != undefined) {
						clearInterval(extendessential);
						if(typeof(jQuery.fn.tpessential.defaults) !== 'undefined') {
							jQuery.fn.tpessential.defaults.ajaxTypes.push({type:"revslider",func:ajaxRevslider,killfunc:ajaxRemoveRevslider,openAnimationSpeed:0.3});   
							// type:  Name of the Post to load via Ajax into the Essential Grid Ajax Container
							// func: the Function Name which is Called once the Item with the Post Type has been clicked
							// killfunc: function to kill in case the Ajax Window going to be removed (before Remove function !
							// openAnimationSpeed: how quick the Ajax Content window should be animated (default is 0.3)
						}
					}
				},30);
			});


//  second task

	jQuery(document).ready(function () { 
		var container = jQuery('.cmsms_slider_55ceec8c42e6c');
			containerWidth = container.width(), 
			firstPost = container.find('article'), 
			postMinWidth = Number(firstPost.css('minWidth').replace('px', '')), 
			postThreeColumns = (postMinWidth * 4) - 1;
			postTwoColumns = (postMinWidth * 3) - 1;
			postOneColumns = (postMinWidth * 2) - 1; 
		
		
		jQuery('.cmsms_slider_55ceec8c42e6c').owlCarousel( {
			items : 3, 
			itemsDesktop : false,
			itemsDesktopSmall : [postThreeColumns,3], 
			itemsTablet : [postTwoColumns,2], 
			itemsMobile : [postOneColumns,1], 
			transitionStyle : false, 
			rewindNav : true, 
			slideSpeed : 200, 
			paginationSpeed : 800, 
			rewindSpeed : 1000, autoPlay : 5000, stopOnHover : true, 
			autoHeight : true, 
			addClassActive : true, 
			responsiveBaseWidth : '.cmsms_slider_55ceec8c42e6c', 
			pagination : false, 
			navigation : true, 
			navigationText : [ "<span class=\"cmsms_prev_arrow\"></span>", "<span class=\"cmsms_next_arrow\"></span>" ] 
		} );
	} );


//

jQuery(document).ready(function () { 
	jQuery("#cmsms_quotes_slider_55ceec8c5b8d5").owlCarousel( {
	 singleItem : true,
	  autoPlay : 10000,
	  stopOnHover: true,
	   pagination: false,
	    navigation : true, 
	    navigationText : [ "<span class=\"cmsms_prev_arrow\"><span></span></span>", "<span class=\"cmsms_next_arrow\"><span></span></span>" ] 
	});
  });



