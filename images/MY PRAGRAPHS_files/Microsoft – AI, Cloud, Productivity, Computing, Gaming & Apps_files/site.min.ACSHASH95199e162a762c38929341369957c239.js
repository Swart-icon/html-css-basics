$(document).ready(function() {
    "use strict";

    if($(".highlight .card-background picture img")){
        var highlightImgAsset = $('img[id^="img-highlight-"]');
        var cardBodyLG = $('div[id^="card-body-highlight-"] .link-group');
        if(highlightImgAsset.length>0){
            for(var i=0; i<highlightImgAsset.length;i++){
                if(highlightImgAsset[i]){
                    var assetSrc = highlightImgAsset[i].src;
                    if(cardBodyLG[i]){
                        if(cardBodyLG[i].children.length>0){
                            for(var j=0;j<cardBodyLG[i].children.length;j++){
                                if (!cardBodyLG[i].children[j].getAttribute("data-bi-assetid")) {
                                    cardBodyLG[i].children[j].setAttribute("data-bi-assetid", assetSrc);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function highlightComponentV1(){
        let subscriptEles =document.querySelectorAll(".highlight sup");
        let footnoteEle = `<span class="sr-text">Footnote</span>`;
        subscriptEles.forEach(ele=>{
            if(ele.children.length==0)
            ele.insertAdjacentHTML('afterbegin',footnoteEle)
        })
    }
    highlightComponentV1();

    document.querySelectorAll("div.highlight .link-group > a").forEach(function(item) {
        // Read the Heading text of highlight component
        var jsllHeading = item.closest(".card-body");
        var parentComponent = item.closest(".carousel-highlight");
        if (jsllHeading) {

            var heading = jsllHeading.querySelector("h1, h2, h3, h4, h5, h6");

            if(heading && heading.textContent) {
                // assign to data-bi-ehn attribute
                if (!item.dataset.biEhn) {
                    item.dataset.biEhn = heading.textContent.trim();
                }

                // assign to data-bi-hn attribute
                if (!item.dataset.biHn) {
                    item.dataset.biHn = heading.textContent.trim();
                }
            }

            // Set the data-bi-compname attribute to Highlight Carousel if it is part of the Highlight Carousel component
            if (!item.dataset.biCompnm) {
                if(parentComponent) {
                    item.dataset.biCompnm = "Highlight Carousel";
                } else {
                   // Read the Component name and assign to data-bi-compname attribute
                   var compName = jsllHeading.getAttribute("data-highlight-compname");
                   if(compName) {
               	       item.dataset.biCompnm = jsllHeading.getAttribute("data-highlight-compname");
                   } else {
               	     item.dataset.biCompnm = "Highlight";
                        }
                   }
            }
        }

        if($("html").length>0 && $("html").attr("lang").length>0){
            var currentLocale = $("html").attr("lang");
            var anchorTag = $(item);
            var productID = "";
            var URL_BUYBOX = "";
            if(anchorTag){
                if(jsllHeading && jsllHeading.getElementsByClassName("product-check-id").length>0){
                    productID = jsllHeading.getElementsByClassName("product-check-id")[0].value;
                }
                if(jsllHeading && jsllHeading.getElementsByClassName("buyBoxEndPoint").length>0){
                    URL_BUYBOX = jsllHeading.getElementsByClassName("buyBoxEndPoint")[0].value;
                }
                if(productID.length > 0 && URL_BUYBOX.length > 0){
                    $.ajax({
                        url: URL_BUYBOX+"?productId="+productID+"&locale="+currentLocale,
                        type: "GET",
                        success: function(response, status) {
                            if (status === 'success'){
                                if (response && response['skuInfo']) {
                                    let skuInfo = response['skuInfo'];
                                    if(Object.keys(skuInfo).length > 0){
                                        let skuFirstObejct = skuInfo[Object.keys(skuInfo)[0]]
                                        if (skuFirstObejct['CallToAction'] && skuFirstObejct['CallToAction']['enabledConditions'] && skuFirstObejct['CallToAction']['enabledConditions'][0] && (skuFirstObejct['CallToAction']['enabledConditions'][0]['value'] === false)){
                                            if(anchorTag[0].hasAttribute('data-bi-ct') && anchorTag[0].getAttribute('data-bi-ct') === "button"){
                                                var buildButtonTag = $('<button>');
                                                $.each(anchorTag[0].attributes,function(){
                                                    buildButtonTag.attr(this.name, this.value);
                                                });
                                                buildButtonTag.attr('disabled',true);
                                                buildButtonTag.html(anchorTag.html());
                                                anchorTag.replaceWith(buildButtonTag);
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        error: function(e) {
                            console.log(e.statusText + ": " + e.status);
                        }
                    });  
                }
            }
        }
        // Assign 0 data-bi-bhvr attribute
        if (!item.dataset.biBhvr) {
            item.dataset.biBhvr = 0;
        }

        var targetDiv = item.closest("div.card");

        // Copy data attributes from anchor element to target div
        $.each(item.dataset, function(key, value) {
            if( key === 'target') {
                targetDiv.dataset['target']= '#';
            } else if (key !== "automationTestId") {
                targetDiv.dataset[key]= value;
            }
        });
        targetDiv.dataset.biCt = "Image";
    });
});
$(document).ready(function () {
    "use strict";    
    // store the boost slide and indicator to be added back on adobe target event
    let $store = []
    // store for fallback slide (first authored non-boost slide)
    let $fallbackStore = []
    // track if the first non-boost authored slide is removed
    let $isFallbackAuthoredSlideRemoved = false;
    let $boostSlideObserver;
    let $beaconFeedbackurl;
    let $beaconEventUrl;
    let $boostSlideAnchor;
    let boostApiCalled = false;

    const getPersonalizedImage = () => {
        if (boostApiCalled) {
            return;
        }

        $(".carousel-highlight").each(function (i, carouselInstance) {
            if ($(carouselInstance).has('div[data-personalize-via-boost="true"]').length == 0
                && !$(carouselInstance).attr('data-contains-boost-slide')) {
                return
            }

            // add back the slide and status indicator if it was removed previously
            if ($store.length > 0) {
                var firstIndicator = $(carouselInstance).find('.carousel-indicators li:first-child');
                if (firstIndicator.length > 0) {
                    firstIndicator.before($store[0]);
                }
            
                var firstCarouselItem = $(carouselInstance).find('.carousel-inner .carousel-item:first-child');
                if (firstCarouselItem.length > 0) {
                    firstCarouselItem.before($store[1]);
                }
            
                $store.length = 0;
            }

            var highlightObj = $(carouselInstance).find('.carousel-inner .carousel-item:first-child');
            // check if highlightObj is not null
            if (highlightObj) {
                let highLightCardObj = $(highlightObj).find('.card-background');
                const apiEndpoint = $(highLightCardObj).data('boost-endpoint');
                const tagId = $(highLightCardObj).data('tag-id');
                // Get the checkbox property from the component dialog
                const isPersonalizedViaBoost = $(highLightCardObj).data('personalize-via-boost');
                // Get the ECS Flag
                const isPersonalizedViaBoostECSFlag = $(highLightCardObj).data('personalize-via-boost-ecs-flag');
                const locale = $(highLightCardObj).data('locale');
                // Call the boost api to get the personalized image
                // and replace the first highlight of the component
                if ($.trim(isPersonalizedViaBoost) === 'true' && $.trim(isPersonalizedViaBoostECSFlag) === 'true') {
                    if ($.trim(apiEndpoint) !== '' && $.trim(tagId) !== '') {
                        boostApiCalled = true;
                        callBoostAPI(apiEndpoint, $.trim(tagId), $.trim(locale), carouselInstance);
                    } else {
                        removeFirstSlideAndforwardControls(carouselInstance);
                        return;
                    }
                } else if ($.trim(isPersonalizedViaBoost) === 'true' && ($.trim(isPersonalizedViaBoostECSFlag) === 'false')) {
                    removeFirstSlideAndforwardControls(carouselInstance);
                    return;
                } else {
                    return;
                }
            }
        });
    };

    window.addEventListener('HOME_HIGHLIGHT_PERSONALIZATION_TOGGLE', function (event) {
        if (event.detail.onOff === 'on') {
            // Call Boost condition is true
            getPersonalizedImage();
        }
    });

    const highlightQsp = window.isBoostTreatmentEnabled || new URLSearchParams(location.search)?.get('pb')?.startsWith('true');

    $(".carousel-highlight").each(function (i, carouselInstance) {
        // if the carousel does not have the personalized slide, return
        if ($(carouselInstance).has('div[data-personalize-via-boost="true"]').length == 0) {
            return;
        }
        if (highlightQsp) {
            // Call Boost condition is true
            getPersonalizedImage();
        }
        else {
            $(carouselInstance).attr("data-contains-boost-slide", "true")
            removeFirstSlideAndforwardControls(carouselInstance);
        }
    });    

    function callBoostAPI(apiEndpoint, tagId, locale, carouselInstance) {
        const payload = {
            "id": generateRandomId(),
            "imp": [
                {
                    "id": generateHyphenatedId(),
                    "tagId": tagId,
                    "native": {
                        "request": "{\"ver\":\"1.1\",\"privacy\":1,\"assets\":[{\"id\":1,\"required\":1,\"data\":{\"type\":514}},{\"id\":2,\"required\":1,\"data\":{\"type\":2}},{\"id\":3,\"required\":1,\"data\":{\"type\":12}},{\"id\":4,\"required\":1,\"img\":{\"w\":539,\"h\":440,\"type\":3}},{\"id\":5,\"required\":1,\"img\":{\"w\":859,\"h\":540,\"type\":3}},{\"id\":6,\"required\":1,\"img\":{\"w\":1083,\"h\":600,\"type\":3}},{\"id\":7,\"required\":1,\"img\":{\"w\":1399,\"h\":600,\"type\":3}},{\"id\":8,\"required\":1,\"img\":{\"w\":1920,\"h\":600,\"type\":3}}]}"
                    }
                }
            ],
            "site": {
                "page": window.location.href,
                "content": {
                    "ext": {
                        "locale": locale
                    }
                },
                "publisher": {
                    "ext": {
                        "propertyid": 10321335
                    }
                }                
            },
            "device": {
                "geo": {
                    "country": "US"
                }
            },
            "user": {
                "ext": {
                    "anid": getCookie("ANID"),
                    "muid": getCookie("MUID")
                }
            },
            "test": 0,
            "stubResponse": false
        };

        $.ajax({
            url: apiEndpoint,
            type: 'post',
            contentType: "application/json",
            headers: { "X-MSEdge-ExternalExp": "mse-storecom-homepage" },
            data: JSON.stringify(payload),
            timeout: 2000,
            success: function (data) {
                // Extract image URLs from the JSON payload
                if (data && data.imp && data.imp.length > 0 && data.imp[0].Promotions && data.imp[0].Promotions.length > 0) {
                    var imagesArray = data.imp[0].Promotions[0].images;

                    var highlightObj = $(carouselInstance).find('.carousel-inner .carousel-item:first-child');
                    const description = data.imp[0].Promotions[0].description;
                    const title = data.imp[0].Promotions[0].title;
                    const imageAltText = data.imp[0].Promotions[0].longTitle; //using longtitle as alt text for image to accommodate current boost schema
                    const actionText = data.imp[0].Promotions[0].actionText;
                    const actionTextAriaLabel = data.imp[0].Promotions[0].brand; // brand is used as aria-label for actionText to accommodate current boost schema
                    const highlightId = $(highlightObj).find('.card-img-overlay').attr('id');
                    const targetURI = data.imp[0].Promotions[0].targetUrl;
                    if (imagesArray && imagesArray.length > 0 && highlightObj) {
                        updateSourceAndImageElementWithWidthMapping(imagesArray, highlightObj, imageAltText);
                    }

                    // check if highlightObj is not null
                    if (highlightObj) {
                        //update description
                        $($(highlightObj).find('.card-foreground .card-body div.mb-4')[0]).text(description);
                        // update title
                        $($(highlightObj).find('.card-foreground .card-body :header')[0]).text(title);
                        // update anchor tag href and text content
                        var anchor = $(highlightObj).find('.card-foreground .card-body .link-group a')[0];
                        $(anchor).attr("href", targetURI);
                        $(anchor).addClass("btn btn-primary");
                        $(anchor).text(actionText);
                        $(anchor).attr("aria-label", actionTextAriaLabel);
                        $(anchor).attr("aria-labelledby", highlightId);
                        // Update Telemetry attributes
                        var highlightCardDiv = $($(highlightObj).find('.card-foreground .card'));
                        updateTelemetryAttributes(highlightCardDiv, anchor, actionText, targetURI, title);
                        // Fire Beacon calls
                        var beacons = data.imp[0].Promotions[0].Beacons;
                        if (beacons && beacons.length > 0 && beacons[0]) {
                            // Fire the event beacon with the 'impression'
                            if (beacons[0].MIFeedbackurl) {
                                fireBeacon(beacons[0].MIFeedbackurl);
                            }

                            // Register for "click" event on the button and call the event beacon with the 'click' action
                            if (beacons[0].EventUrl) {
                                $beaconEventUrl = beacons[0].EventUrl;
                                attachTelemetryHandler(highlightId);
                            }

                            // Create observer for boost slide to fire "viewed" event beacon if the element is in the viewport
                            if (beacons[0].MVFeedbackurl) {
                                $boostSlideAnchor = anchor;
                                $beaconFeedbackurl = beacons[0].MVFeedbackurl;
                                $boostSlideObserver = new IntersectionObserver(handleBoostSlideIntersect, { threshold: 1.0 });
                                $boostSlideObserver.observe($boostSlideAnchor);
                            }
                        }
                        removeFallbackAuthoredSlide(carouselInstance);
                        updateCarouselInstance(carouselInstance);
                    }
                } else {
                    removeFirstSlideAndforwardControls(carouselInstance);
                }
            },
            error: function (xhr, status, error) {
                // Handle the failure scenario
                removeFirstSlideAndforwardControls(carouselInstance);
            }
        });
    }

    // This function removes the first slide and forward controls to the authored slides
    function removeFirstSlideAndforwardControls(carouselInstance) {
        // Detach the first carousel indicator
        var firstCarouselIndicator = $(carouselInstance).find('.carousel-indicators li:first-child');
        if (firstCarouselIndicator) {
            $store.push($(firstCarouselIndicator).detach());
        }
        // Detach the first slide
        var firstHighlightCarouselSlide = $(carouselInstance).find('.carousel-inner .carousel-item:first-child');
        if (firstHighlightCarouselSlide) {
            $store.push($(firstHighlightCarouselSlide).detach());
        }
        // Forward to the second slide
        var forwardCarouselSlide = $(carouselInstance).find('.carousel-inner .carousel-item:first-child');
        if (forwardCarouselSlide) {
            $(forwardCarouselSlide).addClass('active');
        }
        // Make the second carousel indicator active
        var secondCarouselIndicator = $(carouselInstance).find('.carousel-indicators li:first-child');
        if (secondCarouselIndicator) {
            $(secondCarouselIndicator).addClass('active');
        }
        updateCarouselInstance(carouselInstance);
    }

    function updateSlideAriaDetails(carouselInstance) {
        var totalSlides = $(carouselInstance).find('.carousel-item').length;
        $(carouselInstance).find('.carousel-item').each(function (index) {
            var slideNumber = index + 1;
            $(this).attr('aria-label', slideNumber + ' of ' + totalSlides);
        });
    };
        

    function removeFallbackAuthoredSlide(carouselInstance) {
        if ($isFallbackAuthoredSlideRemoved) {
            return;
        }
        // Detach the second carousel indicator
        var secondCarouselIndicator = $(carouselInstance).find('.carousel-indicators li:nth-child(2)');
        if (secondCarouselIndicator) {
            $fallbackStore.push($(secondCarouselIndicator).detach());
        }
        // Detach the second slide
        var secondHighlightCarouselSlide = $(carouselInstance).find('.carousel-inner .carousel-item:nth-child(2)');
        if (secondHighlightCarouselSlide) {
            $fallbackStore.push($(secondHighlightCarouselSlide).detach());
        }
        $isFallbackAuthoredSlideRemoved = true;
    }

    function updateCarouselInstance(carouselInstance) {
        if (mwf) {
            var carouselInstances = mwf.Carousel.getInstances();
            if (carouselInstances) {
                // loop through the instances and compare it with the passed carousel instance
                for (var i = 0; i < carouselInstances.length; i++) {
                    if (carouselInstances[i].el === carouselInstance) {                        
                        // update the carousel instance
                        carouselInstances[i].controls.update();
                        updateSlideAriaDetails(carouselInstance);
                        updateCarposAttribute(carouselInstance);
                    }
                }
            }
        }
    }

    // This function creates a map of width to image object so that the
    // correct image gets replaced for the corresponding width
    function createWidthToImageMap(imagesArray) {
        var widthToImageMap = {};

        imagesArray.forEach(image => {
            if (image.width == 1399) {
                widthToImageMap[1084] = image;
            } else if (image.width == 1920) {
                widthToImageMap[1400] = image;
            } else if (image.width == 1083) {
                widthToImageMap[860] = image;
            } else if (image.width == 859) {
                widthToImageMap[540] = image;
            }
        });

        return widthToImageMap;
    }

    function updateSourceAndImageElementWithWidthMapping(imagesArray, highlightObj, imageAltText) {
        // Create the widthToImageMap
        var widthToImageMap = createWidthToImageMap(imagesArray);

        // Iterate over each source element
        if (widthToImageMap && Object.keys(widthToImageMap).length > 0) {
            // check if highlightObj is not null
            if (highlightObj) {
                $(highlightObj).find('.card-background picture source').each(function (index) {
                    // check if the image url is not null
                    // Get the media attribute value (e.g., "(min-width: 1400px)")
                    var mediaAttribute = $(this).attr('media');
                    // Extract the min-width from the media attribute
                    var minWidth = parseInt(mediaAttribute.match(/\d+/)[0]);
                    // Find the corresponding image object based on minWidth
                    var matchingImage = widthToImageMap[minWidth];
                    // If a matching image is found, update the srcset attribute
                    if (matchingImage) {
                        $(this).attr('srcset', matchingImage.imageUrl);
                    }
                });

                // update the img src
                var imgObj = $(highlightObj).find('.card-background picture img')[0];
                if (imgObj && widthToImageMap[540]) {
                    $(imgObj).attr("src", widthToImageMap[540].imageUrl);
                    $(imgObj).attr("alt", imageAltText);
                }
            }
        }
    }

    // update telemetry attributes
    function updateTelemetryAttributes(highlightCardDiv, anchor, actionText, targetURI, title) {
        if (highlightCardDiv) {
            // Update Div card attributes
            $(highlightCardDiv).attr("data-bi-cn", actionText);
            $(highlightCardDiv).attr("data-bi-ecn", actionText);
            $(highlightCardDiv).attr("data-bi-ct", "Image");
            $(highlightCardDiv).attr("data-bi-pa", "body");
            $(highlightCardDiv).attr("data-target-uri", targetURI);
            $(highlightCardDiv).attr("data-bi-bhvr", "0");
            $(highlightCardDiv).attr("data-bi-ehn", title);
            $(highlightCardDiv).attr("data-bi-hn", title);
            $(highlightCardDiv).attr("data-bi-compnm", "Highlight Carousel");

            // Update anchor tag attributes
            $(anchor).attr("data-bi-cn", actionText);
            $(anchor).attr("data-bi-ecn", actionText);
            $(anchor).attr("data-bi-ct", "button");
            $(anchor).attr("data-bi-pa", "body");
            $(anchor).attr("data-target-uri", targetURI);
            $(anchor).attr("data-bi-bhvr", "0");
            $(anchor).attr("data-bi-ehn", title);
            $(anchor).attr("data-bi-hn", title);
            $(anchor).attr("data-bi-compnm", "Highlight Carousel");
        }
    }

    function updateCarposAttribute(carouselInstance) {
        var activeCarousel = $(carouselInstance).find(".carousel-inner .carousel-item.active");
        var prevCarousel = $(carouselInstance).find('.carousel-controls .carousel-control-prev');
        var nextCarousel = $(carouselInstance).find('.carousel-controls .carousel-control-next');

        var hcItem = $(carouselInstance).find(".carousel-inner .carousel-item");
        if (hcItem) {
            for (var i = 0; i < hcItem.length; i++) {
                $(hcItem).find(".material-md-card").each(function (i, cardinstance) {
                    $(cardinstance).attr("data-bi-carPos", (i + 1).toString());
                });
                if ($(hcItem).find(".card-foreground .link-group ")[i]) {
                    if ($(hcItem).find(".card-foreground .link-group")[i].children.length > 0) {
                        for (var j = 0; j < $(hcItem).find(".card-foreground .link-group")[i].children.length; j++) {
                            $(hcItem).find(".card-foreground .link-group")[i].children[j].setAttribute("data-bi-carPos", (i + 1).toString());
                        }
                    }
                }
            }
        }

        //set the data- Attributes on initial load
        carouselAtrributes();
        function carouselAtrributes() {
            if (typeof activeCarousel !== 'undefined' && activeCarousel) {
                var carPosVal = activeCarousel.attr("aria-label");
                // Assign data-bi-carPos attributes to the Next and Previous button on the carousel
                if (carPosVal) {
                    prevCarousel.attr('data-bi-carPos', carPosVal.charAt(0));
                    nextCarousel.attr('data-bi-carPos', carPosVal.charAt(0));
                }

                var highlightCard = activeCarousel.find("div.highlight .card-body")[0];
                if (highlightCard) {
                    var heading = highlightCard.querySelector("h1, h2, h3, h4, h5, h6");
                    if (heading && heading.textContent) {
                        prevCarousel.attr('data-bi-ehn', heading.textContent.trim());
                        nextCarousel.attr('data-bi-ehn', heading.textContent.trim());
                        prevCarousel.attr('data-bi-hn', heading.textContent.trim());
                        nextCarousel.attr('data-bi-hn', heading.textContent.trim());
                    }
                }
            }
        }
    }

    // This method is taken from telemetry-datamount.js to make the entire slide clickable and updated condition to fire beacon event on click of the entire div or CTA.
    function attachTelemetryHandler(highlightId) {
        let idSelector = "#" + highlightId;
        $(idSelector).each(function() {
            var anchorCount = $(this).find('a').length;
            if (anchorCount === 1) {
              $(this).css('cursor', 'pointer');
            }
         });
    
        $(idSelector).click(function(e) {
            if ($(e.target).closest('a').length) {
            // Code to execute when the anchor tag is clicked
                let currentElement = $(e.target).closest('a');
                if ( currentElement && currentElement.html()) {
                    currentElement.data( "telemetry", true );
                    captureTelemetryPageAction.call(this, currentElement.data());
                }
            }
    
            if (!$(e.target).closest('a').length) {
            // Code to execute when the div (excluding the anchor tags) is clicked
                let currentElement = retrieveCurrentElement(e);
                if ( currentElement && currentElement.html()) {
    //              let linkGroup = currentElement.find("a") || currentElement.find(".link-group");
                    let linkGroup = currentElement.find("a");
                    var anchorCount = linkGroup.length;
                    // Redirect if there is only one anchor tag
                    if (anchorCount === 1) {
                      let card = currentElement.find(".card");
                      let linkDataSet = linkGroup[0].dataset;
                      if (card.length>0 && card[0].dataset && card[0].dataset.hasOwnProperty("biCompnm")) {
                          linkDataSet = card[0].dataset;
                      }
    
                        currentElement.data( "telemetry", true );
                        captureTelemetryPageAction.call(this, linkDataSet);
                        // Get the href of the first anchor tag inside the div
                        var anchorHref = linkGroup[0].getAttribute('href');
                        var target = linkGroup[0].getAttribute('target');
                        if(linkGroup[0].hasAttribute("href") && !linkGroup.hasClass("video-trigger")){
                            // Redirect the page to the same path as the anchor's href if target is not _blank
                            window.open(anchorHref, target);
                        } else {
                            linkGroup[0].click();
                        }
                    }
                }
            }
    
            function captureTelemetryPageAction(linkDataSet) {
                let content = {};
                this.isCapturePageActionLoadedh = function () {
                    return window.telemetry && window.telemetry.webAnalyticsPlugin && window.telemetry.webAnalyticsPlugin.capturePageAction;
                };
                if (this.isCapturePageActionLoadedh()) {
                    content.cN = linkDataSet.biCn;
                    content.cT = linkDataSet.biCt;
                    content.ecn = linkDataSet.biEcn;
                    content.ehn = linkDataSet.biEhn;
                    content.pa = linkDataSet.biPa;
                    content.hn = linkDataSet.biHn;
                    content.compnm = linkDataSet.biCompnm;
                    content.assetid = linkDataSet.biAssetid;
                    content.carpos = linkDataSet.biCarpos;
                    window.telemetry.webAnalyticsPlugin.capturePageAction(null, {
                        behavior: linkDataSet.biBhvr,
                        targetUri: linkDataSet.targetUri,
                        content: content,
                        contentTags: { contentCampaign: "Boost" }
                    });
                }
                if($beaconEventUrl) {
                    fireEventBeacon($beaconEventUrl, 'click')
                }
            }
    
            function retrieveCurrentElement(e) {
                if ($(e.target).closest(idSelector).html()) {
                    let currentElement = $(e.target).closest(idSelector);
                    return currentElement;
                }
            }
        });
    }

    // Function to fire the event beacon with the specified action
    function fireEventBeacon(eventBeaconURL, action) {
        const eventBeaconActionURL = eventBeaconURL.replace('{ACTION}', action);
        // Send the event beacon asynchronously using sendBeacon
        fireBeacon(eventBeaconActionURL);
    }

    function handleBoostSlideIntersect(entries, observer) {
        entries.forEach(entry => {
            if ($beaconFeedbackurl && entry.isIntersecting) {
                fireBeacon($beaconFeedbackurl);
                // Unobserve the boost slide after firing the beacon
                observer.unobserve($boostSlideAnchor);
            }
        }
        )
    };

    function fireBeacon(beaconURL) {
        fetch(beaconURL, {
            method: 'GET',
        })
            .then(response => {
                // Handle response if needed
            })
            .catch(error => {
                // Handle error if the beacon fails
                console.error('Beacon failed to fire:', error);
            });
    }

    // Retrieve cookie value
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    function generateRandomId() {
        // For the format "68B871CF4888496AAE0351436F86B493"
        return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        ).toUpperCase();
    }

    function generateHyphenatedId() {
        // For the format "111c3692-bc66-40c9-8b43-734dbac9427d"
        return crypto.randomUUID() ||
            ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
    }
});
(()=>{"use strict";var t={n:e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return t.d(a,{a}),a},d:(e,a)=>{for(var i in a)t.o(a,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:a[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const e=jQuery;var a=t.n(e);a()((function(){var t;!function(t,e,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".aem-Grid";e.forEach((function(e){var n=new MutationObserver((function(e){e.forEach((function(e){var n=a()(e.addedNodes).find(".f-play-trigger");if(n.length>0){if(i){var o=i(n.closest(r)).text().trim();n.attr("data-bi-hN",o),n.attr("data-bi-ehN",o)}n.attr("data-bi-cN","Video Launch"),n.attr("data-bi-ecN","Video Launch"),n.attr("data-bi-bhvr","240"),n.attr("data-bi-cT","Video"),n.attr("data-bi-pA","Body"),n.attr("data-bi-compNm",t)}})),n.disconnect()}));n.observe(e,{childList:!0,subtree:!0})}))}("Highlight",document.querySelectorAll(".highlight"),(function(t){return t.find(":header")}),".highlight"),(t=document.querySelectorAll(".highlight .video-modal.pause-onhide .embed-responsive.embed-responsive-16by9"))&&0!==t.length&&t.forEach((function(t){t.classList.add("mh-100");var e=new MutationObserver((function(t){t.forEach((function(t){t.addedNodes.forEach((function(t){var a=t;a.classList&&a.classList.contains("c-video-player")&&(a.classList.add("mh-100"),a.style.minWidth="auto",e.disconnect())}))}))}));e.observe(t,{childList:!0,subtree:!0})}))}))})();
