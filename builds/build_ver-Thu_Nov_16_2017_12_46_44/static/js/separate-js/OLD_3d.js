(function () {
    // -----------------------------------------------------------------------------

    // var canvas = new fabric.Canvas('our-canvas'); // create canvas
    // canvas.selection = false;
    // // responsive canvas block
    // var canvasBlock = document.querySelector('.canvas-block__draw'),
    //     canvasBlockWidth = canvasBlock.offsetWidth,
    //     canvasBlockHeight = canvasBlock.offsetHeight;

    // responsive();
    // window.addEventListener('resize', responsive);
    //
    // function responsive() {
    //     var width = (window.innerWidth > 0) ? canvasBlockWidth : screen.width,
    //         height = (window.innerHeight > 0) ? canvasBlockHeight : screen.height,
    //         widthn = width,
    //         heightn = height;
    //
    //     canvas.setDimensions({
    //         width: widthn,
    //         height: heightn
    //     });
    // }

    // start page with device choice

    // var device = document.querySelectorAll('.device-item a'),
    //     deviceBlock = document.querySelector('.device-block'),
    //     inputFile = document.getElementById('imgUpload'),
    //     textarea = document.querySelector('.text-module__edit-text-textarea'),
    //     imgBackground = new Image();

    // // for(var i=0;i<device.length;i++) {
    // //     device[i].addEventListener('click', function (e) {
    // //         e.preventDefault();
    // //         var id = this.getAttribute('href').slice(1),
    // //             // block = document.getElementById('bgblock'),
    // //             // background = block.querySelector('#' + id),
    // //             background = document.getElementById(id);
    // //
    // //         // imgBackground.src = background.getAttribute('src');
    // //         deviceBlock.style.display = 'none';
    // //
    // //         imgBackground = new fabric.Image(background, {
    // //             left: canvas.width/2,
    // //             top: canvas.height/2,
    // //             originX: 'center',
    // //             originY: 'center',
    // //             selectable: false,
    // //         });
    // //         imgBackground.set({
    // //             clipFor: 'instance'
    // //         });
    // //         canvas.add(imgBackground).sendToBack(imgBackground);
    // //     });
    // // }
    //
    // function findByClipName(name) {
    //     return _(canvas.getObjects()).where({
    //         clipFor: name
    //     }).first()
    // }
    // function degToRad(degrees) {
    //     return degrees * (Math.PI / 180);
    // }
    // var clipByName = function (ctx) {
    //     this.setCoords();
    //
    //     var clipRect = findByClipName(this.clipName);
    //     var scaleXTo1 = (1 / this.scaleX);
    //     var scaleYTo1 = (1 / this.scaleY);
    //
    //     ctx.save();
    //
    //
    //     var ctxLeft = -(imgBackground.width / 2);
    //     var ctxTop = -(imgBackground.height  / 2);
    //
    //     var ctxWidth = clipRect.width;
    //     var ctxHeight = clipRect.height;
    //
    //
    //     console.log('this.width - ' + this.width);
    //     console.log('this.width / 2 - ' + this.width/2);
    //     console.log('ctx left - ' + ctxLeft);
    //     console.log('ctx top - ' + ctxTop);
    //
    //     // ctx.translate( ctxLeft, ctxTop );
    //     ctx.translate( ctxLeft, ctxTop);
    //     ctx.rotate((this.angle * -1) * (Math.PI / 180));
    //     ctx.scale(scaleXTo1, scaleYTo1);
    //
    //     ctx.beginPath();
    //
    //     ctx.rect(
    //         clipRect.left - (this.oCoords.tl.x + (imgBackground.width/2)),
    //         clipRect.top - (this.oCoords.tl.y + (imgBackground.height/2)),
    //         clipRect.width,
    //         clipRect.height
    //     );
    //
    //     ctx.stroke();
    //     ctx.closePath();
    //     ctx.restore();
    //
    //     console.log(clipRect.top - (this.oCoords.tl.x - 50));
    //
    //
    //
    //     console.log(clipRect.width);
    //     console.log(clipRect.height);
    //
    // };
    //
    // inputFile.addEventListener('change', readUrl);
    //
    //
    // // function upload image
    // function readUrl() {
    //     var type= ['image/jpg', 'image/jpeg', 'image/png'],
    //         size   = 5000000, // 5mb
    //         file   = inputFile.files[0],
    //         imgOverlay = new Image();
    //
    //     function errMsg(x) {
    //         alert('Error: ' + x);
    //         imgOverlay.src = '';
    //         inputFile.value = '';
    //     }
    //
    //     if (type.indexOf(file.type) === -1) {
    //         errMsg('You can upload only "jpg, jpeg, png" formats');
    //         return false;
    //     } else if (file.size > size) {
    //         errMsg('Max size 5 megabyte');
    //         return false;
    //     } else {
    //         var reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = function(e) {
    //             imgOverlay.src = e.target.result;
    //             imgOverlay.onload = function() {
    //                 var imgInstance = new fabric.Image(imgOverlay, {
    //                     left: canvas.width/2,
    //                     top: canvas.height/2,
    //                     originX: 'center',
    //                     originY: 'center',
    //                     // width: imgBackground.width,
    //
    //                     height: imgBackground.height,
    //                     // scale: 0.5,
    //                     transparentCorners: false,
    //                     cornerColor: '#4e4d52',
    //                     borderColor: '#4e4d52',
    //                     cornerSize: 26,
    //                     clipName: 'instance',
    //                     clipTo: function(ctx) {
    //                         ctx.globalCompositeOperation = 'source-atop';
    //                         return _.bind(clipByName, imgInstance)(ctx)
    //                     }
    //             });
    //
    //                 canvas.add(imgInstance).setActiveObject(imgInstance);
    //
    //                 imgInstance.setControlsVisibility({'mr': false, 'ml': false, 'mt': false, 'mb': false});
    //
    //
    //
    //
    //                 var scaleControl = $('.canvas-block__options-control-method-scale .noUi-handle');
    //                 scaleControl.on('mousemove',function() {
    //                     imgInstance.scale(parseFloat(this.getAttribute('aria-valuenow'))).setCoords();
    //                     canvas.requestRenderAll();
    //                 });
    //
    //                 function updateControls() {
    //                     scaleControl[0].setAttribute('aria-valuenow', parseInt(imgInstance.scaleX));
    //                     scaleControl[0].setAttribute('aria-valuetext', parseInt(imgInstance.scaleX) + '%');
    //                     scaleControl.closest('.noUi-origin')[0].style.left = imgInstance.scaleX + '%';
    //                     $('.canvas-block__options-control-method-output-scale').text(parseFloat(imgInstance.scaleX).toFixed(0) + '%');
    //                 }
    //                 canvas.on({
    //                     'object:scaling': updateControls,
    //                     'object:rotating': updateControls
    //                 });
    //             }
    //         }
    //     }
    // }
    //
    // var textOptions = {
    //     fontSize: 16,
    //     lineHeight: 1,
    //     hasRotatingPoint: true,
    //     left: canvas.width/2,
    //     top: canvas.height/2,
    //     transparentCorners: false,
    //     cornerColor: '#4e4d52',
    //     borderColor: '#4e4d52',
    //     cornerSize: 12,
    //     originX: 'center',
    //     originY: 'center'
    // };
    //
    //
    // var textObject = {};
    // var activeObj;
    //
    //
    // textarea.addEventListener('focus', function () {
    //     textObject = new fabric.IText('', textOptions);
    // });
    // textarea.addEventListener('blur', function () {
    //     canvas.add(textObject).setActiveObject(textObject);
    //     textObject.setControlsVisibility({'mr': false, 'ml': false, 'mt': false, 'mb': false});
    //     canvas.renderAll();
    // });
    //
    // // text area value
    // textarea.addEventListener('keyup', function () {
    //     textObject.text = textarea.value;
    //     canvas.renderAll();
    // });
    //
    // var weightBtn = document.querySelector('.text-module__edit-other-btn--weight');
    // var italicBtn = document.querySelector('.text-module__edit-other-btn--italic');
    // var centerBtn = document.querySelector('.text-module__edit-other-btn--center');
    //
    //
    //
    // function objChange() {
    //     activeObj = this._activeObject;
    //
    //     if(activeObj.active) {
    //         if (activeObj.fontWeight === 'bold') {
    //             weightBtn.classList.add('text-module__edit-other-btn--active');
    //             // console.log('bold');
    //         } else {
    //             weightBtn.classList.remove('text-module__edit-other-btn--active');
    //             // console.log('no-bold');
    //         }
    //         if (activeObj.fontStyle === 'italic') {
    //             italicBtn.classList.add('text-module__edit-other-btn--active');
    //             // console.log('italic');
    //         } else {
    //             italicBtn.classList.remove('text-module__edit-other-btn--active');
    //             // console.log('no-italic');
    //         }
    //         if (activeObj.textAlign === 'center') {
    //             centerBtn.classList.add('text-module__edit-other-btn--active');
    //             // console.log('center');
    //         } else {
    //             centerBtn.classList.remove('text-module__edit-other-btn--active');
    //             // console.log('no-center');
    //         }
    //         // console.log('active');
    //     } else {
    //         weightBtn.classList.remove('text-module__edit-other-btn--active');
    //         centerBtn.classList.remove('text-module__edit-other-btn--active');
    //         italicBtn.classList.remove('text-module__edit-other-btn--active');
    //     }
    //
    // }
    //
    //
    // // change text fontWeight
    // weightBtn.addEventListener('click', function () {
    //     if (activeObj.active) {
    //         if (activeObj.fontWeight === 'bold') {
    //             activeObj.fontWeight = 'normal';
    //             this.classList.remove('text-module__edit-other-btn--active');
    //         } else {
    //             activeObj.fontWeight = 'bold';
    //             this.classList.add('text-module__edit-other-btn--active');
    //         }
    //     }
    //
    //     canvas.renderAll();
    // });
    //
    // // change text fontStyle
    // italicBtn.addEventListener('click', function () {
    //     if (activeObj.active) {
    //         if (activeObj.fontStyle === 'italic') {
    //             activeObj.fontWeight = 'normal';
    //             this.classList.remove('text-module__edit-other-btn--active');
    //         } else {
    //             activeObj.fontWeight = 'italic';
    //             this.classList.add('text-module__edit-other-btn--active');
    //         }
    //     }
    //     canvas.renderAll();
    // });
    //
    // // change text textAlign
    // centerBtn.addEventListener('click', function () {
    //     if (activeObj.active) {
    //         if (activeObj.textAlign === 'center') {
    //             activeObj.textAlign = 'left';
    //             this.classList.remove('text-module__edit-other-btn--active');
    //         } else {
    //             activeObj.textAlign = 'center';
    //             this.classList.add('text-module__edit-other-btn--active');
    //         }
    //     }
    //
    //     canvas.renderAll();
    // });
    //
    // canvas.on({
    //     'object:selected': objChange
    // });


    // init();

})();

(function (doc) {
     // create canvas
       var deviceItem = doc.querySelectorAll('.device-item'), // item background-image choice
            deviceModal = doc.querySelector('.device-block'), // modal window device
            deviceChangeBtn = doc.querySelector('.canvas-block__controls-btn--change'), // device change button
            cnvWrap = doc.querySelector('.canvas-block__draw'), // responsive canvas block
            imageUpload = doc.querySelector('#imgUpload'), // image upload area
            deleteButton = doc.querySelector('.canvas-block__controls-btn--clear'), // delete active object button
            textBlock = doc.querySelector('.canvas-block__options-text'), // textBlock
            textBtnApply = doc.querySelector('.text-module__buttons-btn--apply'), // button for apply changes with text
            textEditBtn = doc.querySelector('.canvas-block__options-choice-wrap-inner--edit-text'), // button for add editing mode
            cancelBtn = doc.querySelector('.text-module__buttons-btn--cancel'), // button cancel text edit mode
            bgImage = new Image(), // empty background for canvas
            image, // empty image for canvas
            text, // empty text for canvas
            isEdit = false,
            editor_object_count_real = 0, // count objects on canvas
            activeTextObject = !1,

            textArea = doc.querySelector('#edit-text'), // text area for adding text
            colorPicker = doc.querySelector('#edit-color'),  // color picker for adding text
            fontWeight = doc.querySelector('#edit-font-weight'),  // color picker for adding text
            fontStyle = doc.querySelector('#edit-font-style'),  // color picker for adding text
            fontCenter = doc.querySelector('#edit-font-center'),  // color picker for adding text
            textScale = doc.querySelector('#text-scale-value'),  // scale slider for text
            textRotate = doc.querySelector('#text-rotate-value'),  // rotate slider for text
            fontFamily = doc.querySelectorAll('[name="font-family"]'),

            nextBtn = document.querySelector('.canvas-block__controls-btn.canvas-block__controls-btn--next'),
            drawPlace = document.querySelector('.canvas-block__draw-place');  // dropdown font family`s for text

       window.objectArray = []; /* array for objects layouts */

    var cnv = window._canvas = new fabric.Canvas('our-canvas');

    cnv.setHeight(100);
    cnv.setWidth(100);

    // canvas selection remove
    cnv.selection = false;
    // canvas overlay controls
    cnv.controlsAboveOverlay = true;
    //
    // cnv.perPixelTargetFind = true;
    //
    cnv.uniScaleTransform = false;

    // Object scaling event handler
    cnv.on('object:scaling', function(){
        var activeObject = cnv.getActiveObject(),
            target = (activeObject && activeObject.type === 'text' || activeObject && activeObject.type === 'i-text')? canvasScaleTextValue: canvasScaleImageValue;
        target.noUiSlider.set( activeObject.get('scaleY') * 100 );        
    });
    // /Object scaling event handler

    // Object rotating event handler
    cnv.on('object:rotating', function(){
        var activeObject = cnv.getActiveObject(),
            target = (activeObject && activeObject.type === 'text' || activeObject && activeObject.type === 'i-text')? canvasRotateTextValue: canvasRotateImageValue;
        target.noUiSlider.set( activeObject.get('angle') );
    });
    // /Object rotating event handler

    // Object selecting event handler
    cnv.on('object:selected', function(){
        var activeObject = cnv.getActiveObject(),
            isText = activeObject && activeObject.type === 'text' || activeObject && activeObject.type === 'i-text',
            targetScale = isText? canvasScaleTextValue: canvasScaleImageValue,
            targetRotate = isText? canvasRotateTextValue: canvasRotateImageValue;
        if ( !isText ) {
            cancelEditActiveText();
        }
        targetScale.noUiSlider.set( activeObject.get('scaleY') * 100 ); 
        targetRotate.noUiSlider.set( activeObject.get('angle') );
    });
    // /Object selecting event handler

    // Object moving event handler
    cnv.on('object:moving', function(e){        
        var activeObject = cnv.getActiveObject(),
            x = activeObject.get('left'),
            y = activeObject.get('top');
        if ( Math.round ( x ) < 0 ) {
            activeObject.set({left: 0});
        }
        if ( Math.round ( y ) < 0 ) {
            activeObject.set({top: 0});
        }
        if ( Math.round ( x ) > cnv.width ) {
            activeObject.set({left: cnv.width});
        }
        if ( Math.round ( y ) > cnv.height ) {
            activeObject.set({top: cnv.height});
        }
    });
    // /Object moving event handler

    // Object deselecting event handler
    cnv.on('selection:cleared', cancelEditActiveText);
    // /Object deselecting event handler

    // choice device model
    function choiceDevice() {
        // var bgImageSrc = this.firstElementChild,
        //     bgOverlay = bgImageSrc.getAttribute('src');

        // set background image
        // bgImage = new fabric.Image(bgImageSrc, {
        //     left: cnv.width/2,
        //     top: cnv.height/2,
        //     originX: 'center',
        //     originY: 'center',
        //     selectable: false,
        //     clipFor: 'instance'
        // });

        // bgImage = cnv.setOverlayImage(bgOverlay, cnv.renderAll.bind(cnv), {
        //     left: cnv.width/2,
        //     top: cnv.height/2,
        //     originX: 'center',
        //     originY: 'center',
        //     selectable: false,
        //     clipFor: 'instance'
        // });

        // cnv.add(bgImage);
            // .bringToFront(bgImage);
            // cnv.backgroundColor = 'rgba(0, 0, 0, 0)';
        // var rect = new fabric.Rect({
        //   left: 100,
        //   top: 100,
        //   fill: 'red',
        //   width: 0,
        //   height: 0
        // });

        // cnv.add(rect);

        // cnv.renderAll();

        // device modal = close
        var canvasPlace = document.querySelector('.canvas-block__draw-place'),
            classArray = canvasPlace.classList,
            device = this.getAttribute('data-device');

        for (var i = 1; i < classArray.length; i++) {
            canvasPlace.classList.remove(classArray[i]);
        }
        canvasPlace.classList.add('device-' + device);
        canvasPlace.classList.add('state-1');

        deviceModal.style.display = 'none';
        window.selectedDevice = device; // For saving device type
    }

    // change device model
    function deviceChange() {
        // device modal = open
        deviceModal.style.display = 'block';
    }

    // responsive canvas
    function responsive() {
        cnvWidth = cnvWrap.offsetWidth; // canvas responsive block width
        cnvHeight = cnvWrap.offsetHeight; // canvas responsive block height

        var width = (window.innerWidth > 0) ? cnvWidth : screen.width,
            height = (window.innerHeight > 0) ? cnvHeight : screen.height,
            widthn = width,
            heightn = height;

        cnv.setDimensions({
            width: widthn,
            height: heightn
        });
    }

    function bringTextToFront() {
        var objList = [],
            objects = cnv.getObjects();

        // cnv.deactivateAll();
        cnv.renderAll();
        for (var i = 0; i < objects.length; i++)  {
            if(objects[i].itemtype === 'text' || objects[i].itemtype === 'i-text') {
                objList.push(objects[i]);
            }
        }
        if (objList.length > 0) {
            for (i = 0; i < objList.length; i++) {
                cnv.bringToFront(objList[i]);
                cnv.renderAll();
            }
        }
    }

    // function bringImageToFront() {
    //     var objList = [],
    //         objects = cnv.getObjects();
    //
    //     for (var i = 0; i < objects.length; i++)  {
    //         if(objects[i].itemtype === 'image') {
    //             objList.push(objects[i]);
    //         }
    //     }
    //     if (objList.length > 0) {
    //         for (i = 0; i < objList.length; i++) {
    //             cnv.sendToBack(objList[i]);
    //         }
    //     }
    // }


    // function onObjectSelected() {
    //     var id = cnv.getObjects().length -1;
    //     var obj = cnv.item(id);
    //     cnv.setActiveObject(obj);
    //     cnv.renderAll();
    // }


    cnv.on("selection:cleared", function() {
        cancelEditActiveText();
    });


    // cnv.on('object:selected', function () {
    //     // cnv.deactivateAll();
    //     // cnv.renderAll();
    //     for(var i = 0; i < objectArray.length; i++) {
    //         cnv.moveTo(objectArray[i],i);
    //     }
    //     cnv.renderAll();
    // });


    // var texts = {};
    // var selectedText = null;
    //
    // function selectText(text) {
    //     if(selectedText) {
    //         cnv.moveTo(selectedText, selectedText.XZIndex);
    //         selectedText = null;
    //     }
    //     if(text) {
    //         selectedText = text;
    //         cnv.bringToFront(selectedText);
    //         cnv.renderAll();
    //     }
    // }
    //
    // cnv.on({'mouse:move': function (e) {
    //     if(!e.target) return;
    //     if(texts[e.target])
    //         selectText(e.target);
    //     else
    //         selectText(null);
    // }});
    //
    // var obj = cnv.getObjects();
    //
    // var objcount = cnv.getObjects().length;
    //
    //
    // for (var i = 0; i < obj.length; i++) {
    //
    //     obj.XZIndex = objcount++;
    //     texts[obj] = i;
    //
    //     // add all to group
    //
    //     console.log(obj);
    //     console.log(objcount);
    //     console.log(obj.XZIndex = objcount++);
    // }


    // cnv.renderAll();

    // find clip element
    function findByClipName(name) {
        return _(cnv.getObjects()).where({
            clipFor: name
        }).first()
    }

    // clip element
    var clipByName = function (ctx) {
        // set coordinates
        this.setCoords();
        // canvas rect scale inverse for image
        var clipRect = findByClipName(this.clipName),
            scaleXTo1 = Math.abs(1 / this.scaleX),
            scaleYTo1 = Math.abs(1 / this.scaleY);

        // canvas save state
        ctx.save();
        // canvas rect width inverse for image
        var ctxLeft = -(this.width / 2),
            ctxTop = -(this.height  / 2),
            ctxWidth = (clipRect.width - clipRect.strokeWidth),
            ctxHeight = (clipRect.height - clipRect.strokeWidth);
        // set translate rect to  - top - left
        ctx.translate(ctxLeft, ctxTop);
        // set rect rotate 0
        ctx.rotate(Math.PI / 180 * (-1 * this.angle));
        // set rect scale 1
        ctx.scale(scaleXTo1, scaleYTo1);
        ctx.beginPath();
        // canvas area for clip image
        ctx.rect(
            clipRect.left - (this.oCoords.tl.x + (bgImage.width / 2)),
            clipRect.top - (this.oCoords.tl.y + (bgImage.height / 2)),
            ctxWidth,
            ctxHeight
        );
        ctx.strokeStyle='transparent';
        ctx.stroke();
        // draw rect
        ctx.closePath();
        // canvas restore state
        ctx.restore();
    };

    // delete object
    function deleteObject(e) {
        e.preventDefault();
        var obj = cnv.getActiveObject();
        cnv.remove(obj);
        if(obj && obj.type === 'text' || obj && obj.type === 'i-text') {
            textBlock.classList.remove('is-edit');
        }
    }

    // remove
    // function addEditActiveText() {
    //     var obj = cnv.getActiveObject();
    //     textBlock.classList.add('is-edit');
    //     if (obj && obj.type === 'text') {
    //         textArea.value = obj.text;
    //     }
    // }

    // cancel text editing mode
    function cancelEditActiveText() {
        // cnv.discardActiveObject();
        var selectFontDisplay = document.querySelector( '.text-module__edit-font-list-text' ),
        	selectFontWrapper = document.querySelector( '.text-module__edit-font-list' ),
        	selectFontFirstItem = fontFamily[0],
        	selectFontFirstItemParent = fontFamily[0].parentNode; // text-module__edit-font-list
        isEdit = false;
        textBlock.classList.remove('is-edit');
        textArea.value = '';
		colorPicker.value = '#000';
		fontWeight.checked = false;
		fontStyle.checked = false;
		fontCenter.checked = false;
		canvasScaleImageValue.noUiSlider.set( 100 );
		canvasRotateImageValue.noUiSlider.set( 0 );
		canvasScaleTextValue.noUiSlider.set( 100 );
		canvasRotateTextValue.noUiSlider.set( 0 );
		selectFontFirstItem.checked = true;
		selectFontDisplay.style = selectFontFirstItemParent.style;
		selectFontDisplay.innerText = selectFontFirstItemParent.innerText;
		selectFontDisplay.setAttribute( 'data-style', selectFontFirstItemParent.getAttribute( 'data-style' ) );
		selectFontWrapper.classList.remove( 'is-active' );
        cnv.renderAll();
    }

    // add text
    function addTextOnCnv(e) {
        var obj = cnv.getActiveObject();
        e.preventDefault();
        isEdit = true;
        if(isEdit) {
            textBlock.classList.add('is-edit');

            if (obj && obj.type === 'text' || obj && obj.type === 'i-text') {
                textArea.value = obj.text;
            }
            textArea.addEventListener('keyup', function () {
                if (obj && obj.type === 'text' || obj && obj.type === 'i-text') {
                    if (!this.value) {
                        return false;
                    }
                    else {
                        obj.setText(this.value);
                    }
                }
                cnv.renderAll();
            });
        }
    }

    // /* editing text */
    // function editingText(e) {
    //     var obj = cnv.getActiveObject();
    //     console.log(obj);
    //     e.preventDefault();
    //     isEdit = true;
    //     if(isEdit) {
    //         if (obj && obj.type === 'text' || obj && obj.type === 'i-text') {
    //             textBlock.classList.add('is-edit');
    //             textArea.value = obj.text;

    //             textArea.addEventListener('keyup', function (e) {
    //                 if (!this.value) {
    //                     return false;
    //                 }
    //                 else {
    //                     obj.set({text: textArea.value});
    //                 }
    //                 cnv.renderAll();
    //             });
    //         }
    //     }
    //     return false;
    // }

    // Edit text event handler
    textArea.addEventListener('keyup', function(e) {
        var selectedObject = cnv.getActiveObject();
        if ( this.value && selectedObject ) {
            selectedObject.text = this.value;
            cnv.renderAll();
        }
        else {
            return false;
        }
    });
    // /Edit text event handler
    // Edit font-family event handler
    for (var i = 0; i < fontFamily.length; i++ ) {
    	fontFamily[i].addEventListener('change', fontFamilySelect);
    }
    function fontFamilySelect(e) {
    	var selectedObject = cnv.getActiveObject();
        if ( this.value && selectedObject ) {
            selectedObject.set({fontFamily: this.value});
            cnv.renderAll();
        }
        else {
            return false;
        }
    }
    // /Edit font-family event handler
    // Edit text`s color event handler
    colorPicker.addEventListener('change', function(e) {
        var selectedObject = cnv.getActiveObject();
        if ( this.value && selectedObject ) {
            selectedObject.set({fill: this.value});
            cnv.renderAll();
        }
        else {
            return false;
        }
    });
    // /Edit text`s color event handler
    // Edit font`s weight event handler
    fontWeight.addEventListener('change', function(e) {
        var selectedObject = cnv.getActiveObject();
        if ( this.checked && selectedObject ) {
            selectedObject.set({fontWeight: 'bold'});
        }
        else if ( selectedObject ) {
            selectedObject.set({fontWeight: 'normal'});
        }
        else {
            return false;
        }
        cnv.renderAll();
    });
    // /Edit font`s weight event handler
    // Edit font`s style event handler
    fontStyle.addEventListener('change', function(e) {
        var selectedObject = cnv.getActiveObject();
        if ( this.checked && selectedObject ) {
            selectedObject.set({fontStyle: 'italic'});
        }
        else if ( selectedObject ) {
            selectedObject.set({fontStyle: 'normal'});
        }
        else {
            return false;
        }
        cnv.renderAll();
    });
    // /Edit font`s style event handler
    // Edit text`s align event handler
    fontCenter.addEventListener('change', function(e) {
        var selectedObject = cnv.getActiveObject();
        if ( this.checked && selectedObject ) {
            selectedObject.set({textAlign: 'center'});
        }
        else if ( selectedObject ) {
            selectedObject.set({textAlign: 'left'});
        }
        else {
            return false;
        }
        cnv.renderAll();
    });
    // /Edit text`s align event handler
    // Edit text`s scale event handler
    canvasScaleTextValue.noUiSlider.on('update', function( values, handle ) {
        var selectedObject = cnv.getActiveObject();
        if ( selectedObject && this.target.firstChild.firstChild.firstChild.classList.contains('noUi-active') ) {
            selectedObject.scale(Number(values[handle].substr(0, values[handle].length - 1)) / 100 );
            cnv.renderAll();
        }
        else {
            return false;
        }
    });
    // /Edit text`s scale event handler
    // Edit text`s angle event handler
    canvasRotateTextValue.noUiSlider.on('update', function( values, handle ) {
        var selectedObject = cnv.getActiveObject();
        if ( selectedObject && this.target.firstChild.firstChild.firstChild.classList.contains('noUi-active') ) {
            selectedObject.set({angle: Number(values[handle].substr(0, values[handle].length - 12)) });
            cnv.renderAll();
        }
        else {
            return false;
        }
    });
    // /Edit text`s angle event handler
    // Edit image`s scale event handler
    canvasScaleImageValue.noUiSlider.on('update', function( values, handle ) {
        var selectedObject = cnv.getActiveObject();
        if ( selectedObject && this.target.firstChild.firstChild.firstChild.classList.contains('noUi-active') ) {
            selectedObject.scale(Number(values[handle].substr(0, values[handle].length - 1)) / 100 );
            cnv.renderAll();
        }
        else {
            return false;
        }
    });
    // /Edit image`s scale event handler
    // Edit image`s angle event handler
    canvasRotateImageValue.noUiSlider.on('update', function( values, handle ) {
        var selectedObject = cnv.getActiveObject();
        if ( selectedObject && this.target.firstChild.firstChild.firstChild.classList.contains('noUi-active') ) {
            selectedObject.set({angle: Number(values[handle].substr(0, values[handle].length - 12)) });
            cnv.renderAll();
        }
        else {
            return false;
        }
    });
    // /Edit image`s angle event handler

    /* set object count */
    // function setObjectCount() {
    //     for(var i = 0, obj = cnv.getObjects(), a = 0; a < obj.length; a++) {
    //         if(obj[a].itemtype === 'image') {
    //             i++;
    //             editor_object_count_real = i;
    //             console.log(editor_object_count_real);
    //         }
    //     }
    // }

    function addText(addtext) {
    	var color, fWeight, fStyle, fCenter, scale, rotate, fFamily;

    	color = colorPicker.value? colorPicker.value: '#000';
    	fWeight = fontWeight.checked? 'bold': 'normal';
    	fStyle = fontStyle.checked? 'italic': 'normal';
    	fCenter = fontCenter.checked? 'center': 'left';
    	scale = canvasScaleTextValue.noUiSlider.get();
    	rotate = canvasRotateTextValue.noUiSlider.get();
    	rotate = Number(rotate.substr(0, rotate.length - 12));
    	fFamily = document.querySelector('[name="font-family"]:checked').value;

        text = new fabric.IText(addtext, {
        	fontFamily: fFamily || 'Helvetica',
            fontWeight: fWeight || '',
            fontStyle: fStyle || '',
            textAlign: fCenter || 'left',
            angle: rotate || 0,
            fill: color || '#000',
            originX: "center",
            originY: "center",
            scaleY: (scale / 100) || 1,
            scaleX: (scale / 100) || 1,
            // transparentCorners: false,
            // enableRetinaScaling: true,
            // cornerColor: '#4e4d52',
            // borderColor: '#4e4d52',
            // cornerSize: 26,
            // lockScalingFlip: !0,
            // lockUniScaling: !0,
            // centeredScaling: !0,
            // clipName: 'instance',
            // itemtype: "text",
            // editable: false,
            // clipTo: function(ctx) {
            //     ctx.globalCompositeOperation = 'destination-over';
            //     return _.bind(clipByName, text)(ctx)
            // }
        });


        cnv.centerObject(text);
        cnv.add(text);

        objectArray.push(text);

        var id = cnv.getObjects().length - 1;


        var obj = cnv.item(id);
        cnv.setActiveObject(obj);



        cnv.setActiveObject(text);
        cnv.renderAll();

        // Event handler of select text element`s
        text.on('selected', function(){
            this.bringToFront();
            document.querySelector('.canvas-block__options-text').classList.add('is-edit');
            // set text area value from element
            if ( this.text ) {
                textArea.value = this.text;
            }
            else {
                textArea.value = '';
            }
            // /set text area value from element
            // set text area value from element
            if ( this.fill ) {
                colorPicker.value = this.fill;
            }
            else {
                colorPicker.value = '#000';
            }
            // set text area value from element
            if ( 'bold' === this.get('fontWeight') ) {
                fontWeight.checked = true;
            }
            else {
                fontWeight.checked = false;
            }
            if ( 'italic' === this.get('fontStyle') ) {
                fontStyle.checked = true;
            }
            else {
                fontStyle.checked = false;
            }
            if ( 'center' === this.get('textAlign') ) {
                fontCenter.checked = true;
            }
            else {
                fontCenter.checked = false;
            }
            canvasScaleTextValue.noUiSlider.set( text.get('scaleY') * 100 );
			canvasRotateTextValue.noUiSlider.set( text.get('angle') );
        });
        // Event handler of scaling text element`s
        text.on('scaling', function(){
            canvasScaleTextValue.noUiSlider.set( text.get('scaleY') * 100 );
        });
        // Event handler of rotating text element`s
        text.on('rotating', function(){
            canvasRotateTextValue.noUiSlider.set( text.get('angle') );
        });
        // Event handler of deselecting text element`s
        // text.on('deselected', function(){
        //     cancelEditActiveText();
        // });
    }
    // var textProperties = ['angle', 'backgroundColor', 'clipTo', 'fill', 'fillRule', 'flipX', 'flipY', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'globalCompositeOperation', 'height', 'id', 'left', 'letterSpace', 'lineHeight', 'opacity', 'originX', 'originY', 'path', 'scaleX', 'scaleY', 'shadow', 'stroke', 'strokeDashArray', 'strokeLineCap', 'strokeLineJoin', 'strokeMiterLimit', 'strokeWidth', 'text', 'textAlign', 'textBackgroundColor', 'textDecoration', 'top', 'transformMatrix', 'useNative', 'visible', 'width'];


    textBtnApply.addEventListener('click', function() {
        var obj = cnv.getActiveObject();
        if (obj && obj.type === 'text' || obj && obj.type === 'i-text') {
            if (!this.value) {
                return false;
            }
            else {
                obj.setText(this.value);
            }
        } else {
            var text = textArea.value;
            addText(text);
        }
    });

    // close text editing mode
    function closeEditMode() {
        isEdit = false;
        textBlock.classList.remove('is-edit');
    }

    // upload image from computer
    function uploadImage() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var reader = new FileReader(),
                file = imageUpload.files[0],
                tempImg = new Image();

            if(file && file.type.match('image.*')) {
                reader.readAsDataURL(file);
            }

            reader.onload = function(e) {
                tempImg.src = e.target.result;

                tempImg.onload = function() {
			    	var scale, rotate;

			    	scale = canvasScaleImageValue.noUiSlider.get();
			    	rotate = canvasRotateImageValue.noUiSlider.get();
			    	rotate = Number(rotate.substr(0, rotate.length - 12));

                    // get the current rectangle

                    // add image to canvas
                    // cnv.deactivateAll();
                    image = new fabric.Image(tempImg);
                    image.set({
                        left: 0,
                        top: 0,
			            angle: rotate || 0,
			            scaleY: (scale / 100) || 1,
			            scaleX: (scale / 100) || 1,
                        originX: 'center',
                        originY: 'center',
                        // width: this.width,
                        // height: bgImage.height,
                        // transparentCorners: false,
                        // enableRetinaScaling: true,
                        // cornerColor: '#4e4d52',
                        // borderColor: '#4e4d52',
                        // itemtype: "image",
                        // cornerSize: 13,
                        // clipName: 'instance',
                        // lockScalingFlip: !0,
                        // lockUniScaling: !0,
                        // centeredScaling: !0,
                        // clipTo: function(ctx) {
                        //     ctx.globalCompositeOperation = 'destination-over';
                        //     return _.bind(clipByName, image)(ctx)
                        // }
                    });

                    cnv.centerObject(image);
                    cnv.add(image).setActiveObject(image);
                    objectArray.push(image);

                    // var id = cnv.getObjects().length - 1;

                    // cnv.deactivateAll();
                    // cnv.renderAll();


                    // var obj = cnv.item(id);
                    // cnv.setActiveObject(obj);

                    // bringTextToFront();

                    image.setControlsVisibility({'mr': false, 'ml': false, 'mt': false, 'mb': false});
                    cnv.renderAll();

                    image.on('selected', function(){
                        // cancelEditActiveText();
			   //          canvasScaleImageValue.noUiSlider.set( image.get('scaleY') * 100 );
						// canvasRotateImageValue.noUiSlider.set( image.get('angle') );
                    });
                    // Event handler of scaling text element`s
                    image.on('scaling', function(){
                        // canvasScaleImageValue.noUiSlider.set( image.get('scaleY') * 100 );
                    });
                    // Event handler of rotating text element`s
                    image.on('rotating', function(){
                        // canvasRotateImageValue.noUiSlider.set( image.get('angle') );
                    });
                    // Event handler of deselecting text element`s
                    // image.on('deselected', function(){
                    //     cancelEditActiveText();
                    // });
                };
            };
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
        // reset value, bug fix for same file
        // imageUpload.value = '';
    }


        /* binds keys */
    function bindEvents() {
        /* event device choice */
        for (var i = 0; i < deviceItem.length; i++) {
            deviceItem[i].addEventListener('click', choiceDevice);
        }
        /* event device change */
        deviceChangeBtn.addEventListener('click', deviceChange);
        /* event delete object */
        deleteButton.addEventListener('click', deleteObject);
        /* event add text edit mode */
        textEditBtn.addEventListener('click', addTextOnCnv);
        /* event cancel text edit mode */
        cancelBtn.addEventListener('click', cancelEditActiveText);
        /* set object */
        //
        // cnv.on("object:added", setObjectCount);
        cnv.on('selection:cleared', cancelEditActiveText);
        /* resize canvas size */
        window.addEventListener('resize', responsive);
        /* event upload image from computer */
        imageUpload.addEventListener('change', uploadImage);
    }

    /* start events */
    bindEvents();
    /* responsive canvas */
    responsive();

    // drawPlace && drawPlace.addEventListener('click', function(e){
    //     console.log(this, 'trigger click on canvas', e);
    //     cnv.discardActiveObject(); 
    // });
    
    document.querySelector('.canvas-block__draw-place').addEventListener('click', function(e){
        if ( 'CANVAS' !== e.target.tagName ) {
            cnv.discardActiveObject();
        }
    });

    // document.querySelector('#state-1').addEventListener('click', canvasPlaceStateChange);
    // document.querySelector('#state-2').addEventListener('click', canvasPlaceStateChange);
    // document.querySelector('#state-3').addEventListener('click', canvasPlaceStateChange);
    // document.querySelector('#state-4').addEventListener('click', canvasPlaceStateChange);
    // document.querySelector('#state-5').addEventListener('click', canvasPlaceStateChange);
    // function canvasPlaceStateChange(e){
    //     var target = this.getAttribute('data-target'),
    //         place = document.querySelector('.canvas-block__draw-place'),
    //         states = [
    //             'state-1',
    //             'state-2',
    //             'state-3',
    //             'state-4',
    //             'state-5',
    //         ];

    //     for (var i = 0; i < states.length; i++) {
    //         if ( place.classList.contains(states[i]) ) {
    //             place.classList.remove(states[i]);
    //         }
    //     }
    //     place.classList.add('state-' + target);
    // }

    var $addObjectButtons = document.querySelectorAll('.canvas-block__options-choice-wrap');
    for (var i = 0; i < $addObjectButtons.length; i++) {
            $addObjectButtons[i].addEventListener('click', function(e){
                cnv.discardActiveObject();
            });
    }

    nextBtn && nextBtn.addEventListener('click', iMakePhotos);

    // Function-interface for creating images in different projections
    function iMakePhotos(e) {
        var states = [0, 1, 2, 3, 4],
            targetElem = document.querySelector('.canvas-block__draw-place');
        window.projectionPng = [];
        makePhotos( states, targetElem );
    }
    // /Function-interface for creating images in different projections

    // Recursive function for creating images of different projections
    function makePhotos( states, targetElem ) {
        var state = states.shift();
        targetElem.classList.remove( 'state-' + state );
        targetElem.classList.add( 'state-' + (state + 1) );
        domtoimage.toPng(targetElem)
            .then(function (dataUrl) {
                var tmp_obj = {
                    title: 'state-' + (state + 1) + '.png',
                    href: dataUrl
                };
                window.projectionPng.push(tmp_obj);
                if ( states.length > 0 ) {
                    makePhotos( states, targetElem );
                }
                else {
                    targetElem.classList.remove( 'state-' + (state + 1) );
                    targetElem.classList.add( 'state-1' );
                }
            });
    }
    // /Recursive function for creating images of different projections

    window.projectionPng = [];
    window.selectedDevice = 'phone';

    // Getter for getting all the information about the case
    // @return Object
    window.getCaseInfo = function() {
        var _return = {
            objects: window.objectArray,            // ['objects']          - contains canvas objects
            colors: window.currentColor,            // ['colors']           - contains all information about the colors
            projectionPng: window.projectionPng,    // ['projectionPng']    - contains objects of projections
            device: window.selectedDevice           // ['device']           - contains information about the device
        }
        return _return;
    }
    // /Getter for getting all the information about the case
}(document));
