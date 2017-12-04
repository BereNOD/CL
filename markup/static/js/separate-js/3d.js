(function ( d ) {

	// if DEBUG is active:
	//  - added state control buttons
	//  - in generete projections added them into body end
	//  - hide preloader
	var DEBUG = true;

	var constructorRequest = function ( data ) {
		return {
			url: location.origin + '/index.php?route=constructor/constructor/validate',
			method: 'POST',
			data: data,
			success: function ( response ) {
				console.log( response );
			},
			error: function () {
				console.log( arguments );
			}
		};
	};

	var deviceBlock = d.querySelector('.device-block'),
	$deviceBlock_items = deviceBlock.querySelectorAll('.device-item'),
	changeDevice = d.querySelector('.canvas-block__controls-btn--change'),
	clear = d.querySelector('.canvas-block__controls-btn--clear'),
	next = d.querySelector('.canvas-block__controls-btn--next');

	var addImage = d.querySelector('.canvas-block__options-choice-wrap[data-type="image"]'),
	imgUpload = d.querySelector('#imgUpload'),
	editImageScale = canvasScaleImageValue.noUiSlider,
	editImageRotate = canvasRotateImageValue.noUiSlider;

	var addText = d.querySelector('.canvas-block__options-choice-wrap[data-type="text"]'),
	editTextBlock = d.querySelector('.canvas-block__options-text'),
	editTextBlockCancel = d.querySelector('.text-module__buttons-btn--cancel'),
	editTextBlockApply = d.querySelector('.text-module__buttons-btn--apply'),
	$fontFamily = d.querySelectorAll('[name="font-family"]'),
	fontFamilyDefaultItem = d.querySelector('.text-module__edit-font-list-drop-item:first-child'),
	fontListBlock = d.querySelector('.text-module__edit-font-list'),
	textarea = d.querySelector('#edit-text'),
	selectedFontFamily = d.querySelector('.text-module__edit-font-list-drop-item:first-child input'),
	editTextScale = canvasScaleTextValue.noUiSlider,
	editTextRotate = canvasRotateTextValue.noUiSlider,
	editTextFontWeight = d.querySelector('#edit-font-weight'),
	editTextFontStyle = d.querySelector('#edit-font-style'),
	editTextAlign = d.querySelector('#edit-font-center'),
	editTextColor = d.querySelector('#edit-color');

	var cnv = window._canvas = new fabric.Canvas('our-canvas', {
		selection: false,
		controlsAboveOverlay: true,
		uniScaleTransform: false,
		preserveObjectStacking: true
	}),
	cnvWrapper = d.querySelector('.canvas-block__draw'),
	cnvPlace = d.querySelector('.canvas-block__draw-place'),
	overlayImage;

	window.$imageObjects = [];
	window.$textObjects = [];

	fabric.Object.prototype.set({
		transparentCorners: false,
		borderColor: '#4e4d52',
		cornerSize: 15,
		padding: 1,
	});

	var topBottom = new Image();
	topBottom.onload = function() {
		bottomTop.src = 'static/img/content/controls/bottom-top.png';
	}
	topBottom.src = 'static/img/content/controls/top-bottom.png';

	var bottomTop = new Image();
	bottomTop.onload = function() {
		rotate.src = 'static/img/content/controls/rotate.png';
	}
	

	var rotate = new Image();
	rotate.onload = function() {
		fabric.Object.prototype.drawControls = function (ctx) {

			if (!this.hasControls) {
				return this;
			}

			var wh = this._calculateCurrentDimensions(),
			width = wh.x,
			height = wh.y,
			scaleOffset = this.cornerSize,
			left = -(width + scaleOffset) / 2,
			top = -(height + scaleOffset) / 2,
			methodName = this.transparentCorners ? 'stroke' : 'fill';

			ctx.save();
			ctx.strokeStyle = ctx.fillStyle = this.cornerColor;
			if (!this.transparentCorners) {
				ctx.strokeStyle = this.cornerStrokeColor;
			}
			this._setLineDash(ctx, this.cornerDashArray, null);

			// top-left
			ctx.drawImage(topBottom, left, top, 19, 19);
			// bottom-right
			ctx.drawImage(topBottom, left + width, top + height, 19, 19);

			// top-right
			ctx.drawImage(bottomTop, left + width, top, 19, 19);
			// bottom-left
			ctx.drawImage(bottomTop, left, top + height, 19, 19);

			if ( !this.get('lockUniScaling')) {

				// middle-top
				this._drawControl('mt', ctx, methodName,
					left + width / 2,
					top);

				// middle-bottom
				this._drawControl('mb', ctx, methodName,
					left + width / 2,
					top + height);

				// middle-right
				this._drawControl('mr', ctx, methodName,
					left + width,
					top + height / 2);

				// middle-left
				this._drawControl('ml', ctx, methodName,
					left,
					top + height / 2);
			}

			// middle-top-rotate
			if (this.hasRotatingPoint) {
				var rotateLeft = left + width / 2;
				var rotateTop = top - this.rotatingPointOffset;
				ctx.drawImage(rotate, rotateLeft - 2, rotateTop, 20, 20);
			}

			ctx.restore();

			return this;

		}
	}

	window.device = '';

	var canvasWidth = 480,
	canvasHeight = 662,
	defaultCanvasWidth = 480,
	defaultCanvasHeight = 662,
	resizeOverlayCheckpoint = 750; // screen width for overlay scale conversion (in px)

	var projections = {
		spineElement: d.getElementById('spine'),
		zipperElement: d.getElementById('zipper'),
		zipperSliderElement: d.getElementById('zipper-slider'),
		backfaceElement: d.getElementById('backface'),
		'1': {
			spine: {
				imageWidth: 1641,
				imageHeight: 139,
				proportion: 1
			},
			slider: {
				imageWidth: 1137,
				imageHeight: 864,
				proportion: 1
			}
		},
		'2': {
			spine: {
				imageWidth: 1739,
				imageHeight: 242,
				proportion: 1
			}
		},
		'3': {
			spine: {
				imageWidth: 1230,
				imageHeight: 695,
				proportion: 1
			},
			zipper: {
				imageWidth: 1045,
				imageHeight: 962,
				proportion: 1
			}
		},
		'4': {
			spine: {
				imageWidth: 274,
				imageHeight: 1122,
				proportion: 1
			},
			zipper: {
				imageWidth: 1779,
				imageHeight: 441,
				proportion: 1
			}
		},
		'5': {
			spine: {
				imageWidth: 139,
				imageHeight: 1641,
				proportion: 1
			},
			backface: {
				imageWidth: canvasWidth,
				imageHeight: canvasHeight,
				proportion: 1
			}
		}
	}

	projections['1'].spine.proportion = projections['1'].spine.imageHeight / projections['1'].spine.imageWidth;
	projections['1'].slider.proportion = projections['1'].slider.imageWidth / projections['1'].slider.imageHeight;
	projections['2'].spine.proportion = projections['2'].spine.imageHeight / projections['2'].spine.imageWidth;
	projections['3'].spine.proportion = projections['3'].spine.imageHeight / projections['3'].spine.imageWidth;
	projections['3'].zipper.proportion = projections['3'].zipper.imageWidth / projections['3'].zipper.imageHeight;
	projections['4'].spine.proportion = projections['4'].spine.imageWidth / projections['4'].spine.imageHeight;
	projections['3'].zipper.proportion = projections['3'].zipper.imageWidth / projections['3'].zipper.imageHeight;
	projections['5'].spine.proportion = projections['5'].spine.imageWidth / projections['5'].spine.imageHeight;
	projections['5'].backface.proportion = projections['5'].backface.imageWidth / projections['5'].backface.imageHeight;

	responsive();

	window.overlay = { // (in px)
		objectTitles: ['top', 'bottom', 'left', 'right', 'middle'],
		'top': {
			object: null,
			fill: 'rgba(255, 255, 255, 0.5)',
			width: function ( cW ) {
				return cW;
			},
			height: function ( cH ) {
				return ((cH - canvasHeight) / 2);
			},
			top: function ( cH ) {
				return ((cH - canvasHeight) / 4);
			},
			left: function ( cW ) {
				return (cW / 2);
			}
		},
		'bottom': {
			object: null,
			fill: 'rgba(255, 255, 255, 0.5)',
			width: function ( cW ) {
				return cW;
			},
			height: function ( cH ) {
				return ((cH - canvasHeight) / 2);
			},
			top: function ( cH ) {
				return (cH - (cH - canvasHeight) / 4);
			},
			left: function ( cW ) {
				return (cW / 2);
			}
		},
		'left': {
			object: null,
			fill: 'rgba(255, 255, 255, 0.5)',
			width: function ( cW ) {
				return ((cW - canvasWidth) / 2);
			},
			height: function ( cH ) {
				return (canvasHeight);
			},
			top: function ( cH ) {
				return (cH / 2);
			},
			left: function ( cW ) {
				return ((cW - canvasWidth) / 4);
			}
		},
		'right': {
			object: null,
			fill: 'rgba(255, 255, 255, 0.5)',
			width: function ( cW ) {
				return ((cW - canvasWidth) / 2);
			},
			height: function ( cH ) {
				return (canvasHeight);
			},
			top: function ( cH ) {
				return (cH / 2);
			},
			left: function ( cW ) {
				return (cW - (cW - canvasWidth) / 4);
			}
		},
		'middle': {
			object: null,
			fill: function () {
				return currentColor.get('Back cover HEX');
			},
			width: function ( cW ) {
				return (canvasWidth);
			},
			height: function ( cH ) {
				return (canvasHeight);
			},
			top: function ( cH ) {
				return (cH / 2);
			},
			left: function ( cW ) {
				return (cW / 2);
			}
		},
		set: function ( part, key, value ) {
			self.overlay[part][key] = value;
		},
		get: function ( part, key ) {
			return self.overlay[part][key];
		}
	}
	setOverlay();

	/***********************************Bind events block*START*************************************/

	cnv.on('object:scaling', _scaling); // Object scaling event handler
	cnv.on('object:rotating', _rotating); // Object rotating event handler
	cnv.on('object:selected', _selected); // Object selecting event handler
	cnv.on('object:moving', _moving); // Object moving event handler
	cnv.on('selection:cleared', _editTextBlockApply); // Object deselecting event handler
	cnv.on('after:render', _afterRender); // Canvas after render event handler
	cnv.on('text:changed', _textChanged); // Canvas text changed in boundary box event handler

	(function(items){
		for (var i = 0; i < items.length; i++) {
			// Choose device items
			items[i] && items[i].addEventListener('click', _chooseDevice);
		}
	})($deviceBlock_items);
	changeDevice && changeDevice.addEventListener('click', _changeDevice);
	clear && clear.addEventListener('click', _clear);
	next && next.addEventListener('click', _next);
	window.addEventListener('keyup', _delete);

	imgUpload && imgUpload.addEventListener('change', _imgUpload);
	addImage && addImage.addEventListener('click', _addImage);

	addText && addText.addEventListener('click', _addText);
	textarea && textarea.addEventListener('keyup', _textarea);
	editTextBlockCancel && editTextBlockCancel.addEventListener('click', _editTextBlockCancel);
	editTextBlockApply && editTextBlockApply.addEventListener('click', _editTextBlockApply);
	document.body.addEventListener('click', _closeSelectList);
	(function(items){
		for (var i = 0; i < items.length; i++) {
			items[i] && items[i].addEventListener('click', _chooseFontFamily);
		}
	})($fontFamily);
	editTextFontWeight && editTextFontWeight.addEventListener('change', _editTextFontWeight);
	editTextFontStyle && editTextFontStyle.addEventListener('change', _editTextFontStyle);
	editTextAlign && editTextAlign.addEventListener('change', _editTextAlign);
	editTextColor && editTextColor.addEventListener('change', _editTextColor);

	editImageScale && editImageScale.on('update', _updateImageScale);
	editImageRotate && editImageRotate.on('update', _updateImageRotate);
	editTextScale && editTextScale.on('update', _updateTextScale);
	editTextRotate && editTextRotate.on('update', _updateTextRotate);
	editImageScale && editImageScale.on('change', _changeImageScale);
	editImageRotate && editImageRotate.on('change', _changeImageRotate);
	editTextScale && editTextScale.on('change', _changeTextScale);
	editTextRotate && editTextRotate.on('change', _changeTextRotate);

	window.addEventListener('resize', _windowResize);
	window.addEventListener('load', _windowLoad);

	/***********************************Bind events block**END**************************************/

	/***********************************Event handlers block*START**********************************/

	// Choose device item event: click handler
	function _chooseDevice ( /*[Object] event*/ e ) {
		e.preventDefault();
		window.device = this.getAttribute('data-device');

		cnvPlace.setAttribute('device', window.device);
		cnvPlace.setAttribute('state', '1');

		cnv.clear();
		window.$textObjects = [];
		window.$imageObjects = [];
		renderSpine();
		setObjectsOrder();
		deviceBlock.style.display = 'none';
		return false;
	}

	// Change device button event: click handler
	function _changeDevice ( /*[Object] event*/ e ) {
		e.preventDefault();
		deviceBlock.style.display = 'block';
		return false;
	}

	// Clear button event: click handler
	function _clear ( /*[Object] event*/ e ) {
		e.preventDefault();
		cnv.clear();
		window.$textObjects = [];
		window.$imageObjects = [];
		renderSpine();
		setObjectsOrder();
		return false;
	}

	// Delete key event: keyup handler
	function _delete ( /*[Object] event*/ e ) {
		var e = e || event;
		if ( 46 === e.keyCode ) {
			var obj = cnv.getActiveObject();
			if ( obj ) {
				cnv.remove(obj);
				cnv.remove(obj);
				if( is_text(obj) ) {
					closeEditTextBar();
					window.$textObjects.splice(window.$textObjects.indexOf(obj), 1);
				}
				else if ( is_image(obj) ) {
					window.$imageObjects.splice(window.$imageObjects.indexOf(obj), 1);
				}
				cnv.discardActiveObject();
				cnv.renderAll(); 
				setObjectsOrder();
			}
		}
	}

	// Next button event: click handler
	function _next ( /*[Object] event*/ e ) {
		e.preventDefault();
		iMakePhotos( e, function(){
			console.log('test');
		});
		return false;
	}

	// Upload image event: change handler
	function _imgUpload ( /*[Object] event*/ e ) {
		e.preventDefault();
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			var reader = new FileReader(),
			file = this.files[0],
			tempImg = new Image();

			if(file && file.type.match('image.*')) {
				reader.readAsDataURL(file);
			}

			reader.onload = function(e) {
				tempImg.src = e.target.result;

				tempImg.onload = function() {
					var scale, rotate;
					scale = editImageScale.get();
					rotate = editImageRotate.get();
					rotate = Number(rotate.substr(0, rotate.length - 12));

					image = new fabric.Image(tempImg);
					image.set({
						left: 0,
						top: 0,
						angle: rotate || 0,
						scaleY: (scale / 100) || 1,
						scaleX: (scale / 100) || 1,
						originX: 'center',
						originY: 'center',
						minScaleLimit: 0.1
					});

					if ( tempImg.width > canvasWidth || tempImg.height > canvasHeight ) {
						var scaleX = canvasWidth / tempImg.width,
						scaleY = canvasHeight / tempImg.height;

						scale = ( scaleX > scaleY )? scaleY: scaleX;
						image.set({
							scaleY: scale * 0.8,
							scaleX: scale * 0.8,
						});
					}

					var minScaleX = 0.09;
					var minScaleY = 0.09;

					image.on('scaling', function ( e ) {
						var scaleX = this.scaleX;
						var scaleY = this.scaleY;
						var left = this.left;
						var top = this.top;
						var lastGoodLeft = this.lastGoodLeft;
						var lastGoodTop = this.lastGoodTop;
						if ( scaleX && scaleY && left && top ) {
							window.tmp_object_values.set('scaleX', scaleX);
							window.tmp_object_values.set('scaleY', scaleY);
							window.tmp_object_values.set('left', left);
							window.tmp_object_values.set('top', top);
							window.tmp_object_values.set('lastGoodLeft', lastGoodLeft);
							window.tmp_object_values.set('lastGoodTop', lastGoodTop);
						}
						else {
							if(scaleX && this.scaleX < minScaleX) {
								this.scaleX = minScaleX;
								this.scaleY = minScaleY;
								this.left = this.lastGoodLeft;
								this.top = this.lastGoodTop;
							}
							else {
								this.scaleX = window.tmp_object_values.get('scaleX');
								this.scaleY = window.tmp_object_values.get('scaleY');
								this.left = window.tmp_object_values.get('left');
								this.top = window.tmp_object_values.get('top');
							}
							if (lastGoodLeft && lastGoodTop) {
								this.lastGoodTop = this.top;
								this.lastGoodLeft = this.left;
							}
							else {
								this.lastGoodTop = window.tmp_object_values.get('top');
								this.lastGoodLeft = window.tmp_object_values.get('left');
							}
						}
					});

					image.setControlsVisibility({'mr': false, 'ml': false, 'mt': false, 'mb': false});

					cnv.centerObject(image);
					cnv.add(image).setActiveObject(image);
					window.$imageObjects.push(image);

					setObjectsOrder();
					cnv.renderAll();

					image.baseTop = image.top;
					image.baseLeft = image.left;
					image.baseScale = image.scaleX;

					// base size parts
					image.size = {
						width: image.width,
						height: image.height,
						conversion: function () {
							var k = canvasWidth / defaultCanvasWidth;
							image.width = this.width * k;
							image.height = this.height * k;
						}
					};

					// base position parts
					image.position = {
						// top
						overlayOffsetY: overlay['top'].height(cnv.height),
						canvasOffsetY: image.top - overlay['top'].height(cnv.height),
						// left
						overlayOffsetX: overlay['left'].width(cnv.width),
						canvasOffsetX: image.left - overlay['left'].width(cnv.width),
						scaleOffsetX: function (scale) {
							this.canvasOffsetX = this.canvasOffsetX * scale;
						},
						scaleOffsetY: function (scale) {
							this.canvasOffsetY = this.canvasOffsetY * scale;
						},
						conversionOffsetX: function () {
							this.canvasOffsetX = image.left - overlay['left'].width(cnv.width);
						},
						conversionOffsetY: function () {
							this.canvasOffsetY = image.top - overlay['top'].height(cnv.height);
						},
						conversionOverlayOffset: function () {
							this.overlayOffsetY = overlay['top'].height(cnv.height);
							this.overlayOffsetX = overlay['left'].width(cnv.width);
						}
					};
					_windowResize();
				};
			};
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
		this.value = null;
		return false;
	}

	// Add image button event: click handler
	function _addImage ( /*[Object] event*/ e ) {
		cnv.discardActiveObject();
	}

	// Add text button event: click handler
	function _addText ( /*[Object] event*/ e ) {
		e.preventDefault();
		cnv.discardActiveObject();
		if ( !editTextBlock.classList.contains('is-edit') ) {
			editTextBlock.classList.add('is-edit');
			_editTextColor.call(editTextColor);
		}
		return false;
	}

	function _textarea ( /*[Object] event*/ e ) {
		var activeObject = cnv.getActiveObject();
		if ( activeObject ) {
			activeObject.text = this.value;
			window.tmpTextProps && window.tmpTextProps.setNEW( 'text', activeObject.get('activeObject.text') );
			cnv.renderAll();
		}
	}

	// Edit text block Cancel button event: click handler
	function _editTextBlockCancel ( /*[Object] event*/ e ) {
		e.preventDefault();
		closeEditTextBar();
		cnv.discardActiveObject();
		return false;
	}

	// Edit text block Apply button event: click handler
	function _editTextBlockApply ( /*[Object] event*/ e ) {
		window.tmp_object_values = undefined;
		var activeObject = cnv.getActiveObject();
		if ( this === cnv || activeObject ) {

			// activeObject.set();
			window.tmpTextProps && window.tmpTextProps.NEW && activeObjectSetState ( window.tmpTextProps.NEW );
			window.tmpTextProps = undefined;
		}
		else {
			var color, fWeight, fStyle, fCenter, scale, rotate, fFamily;

			fFamily = selectedFontFamily.value;
			scale = editTextScale.get();
			scale = Number(scale.substr(0, scale.length - 1));
			rotate = editTextRotate.get();
			rotate = Number(rotate.substr(0, rotate.length - 12));
			fWeight = editTextFontWeight.checked? 'bold': 'normal';
			fStyle = editTextFontStyle.checked? 'italic': 'normal';
			fCenter = editTextAlign.checked? 'center': 'left';
			color = editTextColor.value? editTextColor.value: '#000';

			text = new fabric.IText(textarea.value, {
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
				minScaleLimit: 0.1
			});
			text.setControlsVisibility({'mr': false, 'ml': false, 'mt': false, 'mb': false});

			var minScaleX = 0.09;
			var minScaleY = 0.09;

			text.on('scaling', function ( e ) {
				var scaleX = this.scaleX;
				var scaleY = this.scaleY;
				var left = this.left;
				var top = this.top;
				var lastGoodLeft = this.lastGoodLeft;
				var lastGoodTop = this.lastGoodTop;
				if ( scaleX && scaleY && left && top ) {
					window.tmp_object_values.set('scaleX', scaleX);
					window.tmp_object_values.set('scaleY', scaleY);
					window.tmp_object_values.set('left', left);
					window.tmp_object_values.set('top', top);
					window.tmp_object_values.set('lastGoodLeft', lastGoodLeft);
					window.tmp_object_values.set('lastGoodTop', lastGoodTop);

					console.log('window.tmp_object_values', window.tmp_object_values);
				}
				else {
					// window.tmp_object_values.get('scaleX');
					// window.tmp_object_values.get('scaleY');
					// window.tmp_object_values.get('left');
					// window.tmp_object_values.get('top');
					// window.tmp_object_values.get('lastGoodLeft');
					// window.tmp_object_values.get('lastGoodTop');
					if(scaleX && this.scaleX < minScaleX) {
						this.scaleX = minScaleX;
						this.scaleY = minScaleY;
						this.left = this.lastGoodLeft;
						this.top = this.lastGoodTop;
					}
					else {
						this.scaleX = window.tmp_object_values.get('scaleX');
						this.scaleY = window.tmp_object_values.get('scaleY');
						this.left = window.tmp_object_values.get('left');
						this.top = window.tmp_object_values.get('top');
					}
					if (lastGoodLeft && lastGoodTop) {
						this.lastGoodTop = this.top;
						this.lastGoodLeft = this.left;
					}
					else {
						this.lastGoodTop = window.tmp_object_values.get('top');
						this.lastGoodLeft = window.tmp_object_values.get('left');
					}
				}
			});

			text.on('deselected', _editTextBlockApply);

			cnv.centerObject(text);
			cnv.add(text);
			window.$textObjects.push(text);
			setObjectsOrder();
			text.baseScale = text.scaleX;

			// base size parts
			text.size = {
				width: text.width,
				height: text.height,
				conversion: function () {
					var k = canvasWidth / defaultCanvasWidth;
					text.width = this.width * k;
					text.height = this.height * k;
				}
			};

			// base position parts
			text.position = {
				// top
				overlayOffsetY: overlay['top'].height(cnv.height),
				canvasOffsetY: text.top - overlay['top'].height(cnv.height),
				// left
				overlayOffsetX: overlay['left'].width(cnv.width),
				canvasOffsetX: text.left - overlay['left'].width(cnv.width),
				scaleOffsetX: function (scale) {
					this.canvasOffsetX = this.canvasOffsetX * scale;
				},
				scaleOffsetY: function (scale) {
					this.canvasOffsetY = this.canvasOffsetY * scale;
				},
				conversionOffsetX: function () {
					this.canvasOffsetX = text.left - overlay['left'].width(cnv.width);
				},
				conversionOffsetY: function () {
					this.canvasOffsetY = text.top - overlay['top'].height(cnv.height);
				},
				conversionOverlayOffset: function () {
					this.overlayOffsetY = overlay['top'].height(cnv.height);
					this.overlayOffsetX = overlay['left'].width(cnv.width);
				}
			};
			_windowResize();
		}
		cnv.renderAll();
		cnv.discardActiveObject();
		closeEditTextBar();
	}

	// Edit text select list close
	function _closeSelectList ( /*[Object] event*/ e ) {
		if ( !e.target.classList.contains('text-module__edit-font-list')
			&& !e.target.parentNode.classList.contains('text-module__edit-font-list') ) {
			if ( fontListBlock.classList.contains('is-active') ) {
				fontListBlock.classList.remove('is-active');
			}
		}
	}

	// Edit text select list select font family
	function _chooseFontFamily ( /*[Object] event*/ e ) {
		selectedFontFamily = d.querySelector('[name="font-family"]:checked');
		var activeObject = cnv.getActiveObject();
		if ( this.value ) {
			activeObject && activeObject.set({fontFamily: this.value});
			window.tmpTextProps && window.tmpTextProps.setNEW( 'fontFamily', activeObject.get('fontFamily') );
			cnv.renderAll();
		}
	}

	// Edit text change font weight
	function _editTextFontWeight ( /*[Object] event*/ e ) {
		e.preventDefault();
		var activeObject = cnv.getActiveObject();
		if ( this.checked ) {
			activeObject && activeObject.set({fontWeight: 'bold'});
			editTextCheckboxActivate.call(editTextFontWeight);
		}
		else {
			activeObject && activeObject.set({fontWeight: 'normal'});
			editTextCheckboxDeactivate.call(editTextFontWeight);
		}
		window.tmpTextProps && window.tmpTextProps.setNEW( 'fontWeight', activeObject.get('fontWeight') );
		cnv.renderAll();
		return false;
	}

	// Edit text change font style
	function _editTextFontStyle ( /*[Object] event*/ e ) {
		e.preventDefault();
		var activeObject = cnv.getActiveObject();
		if ( this.checked ) {
			activeObject && activeObject.set({fontStyle: 'italic'});
			editTextCheckboxActivate.call(editTextFontStyle);
		}
		else {
			activeObject && activeObject.set({fontStyle: 'normal'});
			editTextCheckboxDeactivate.call(editTextFontStyle);
		}
		window.tmpTextProps && window.tmpTextProps.setNEW( 'fontStyle', activeObject.get('fontStyle') );
		cnv.renderAll();
		return false;
	}

	// Edit text change text align
	function _editTextAlign ( /*[Object] event*/ e ) {
		e.preventDefault();
		var activeObject = cnv.getActiveObject();
		if ( this.checked ) {
			activeObject && activeObject.set({textAlign: 'center'});
			editTextCheckboxActivate.call(editTextAlign);
		}
		else {
			activeObject && activeObject.set({textAlign: 'left'});
			editTextCheckboxDeactivate.call(editTextAlign);
		}
		window.tmpTextProps && window.tmpTextProps.setNEW( 'textAlign', activeObject.get('textAlign') );
		cnv.renderAll();
		return false;
	}

	// Edit text change text color
	function _editTextColor ( /*[Object] event*/ e ) {
		this.nextElementSibling.style.borderColor = this.value;
		var activeObject = cnv.getActiveObject();
		if ( this.value && activeObject ) {
			activeObject.set({fill: this.value});
			cnv.renderAll();
			window.tmpTextProps && window.tmpTextProps.setNEW( 'fill', activeObject.get('fill') );
		}
	}

	// Object scaling event handler
	function _scaling ( /*[Object] event*/ e ) {
		var activeObject = cnv.getActiveObject(),
		scale = activeObject.get('scaleY') * 100;
		activeObject.lockMovementX = true;
		activeObject.lockMovementY = true;
		if ( is_text(activeObject) ) {
			editTextScale.set( scale );
			window.tmpTextProps && window.tmpTextProps.setNEW( 'scale', scale );
		}
		else {
			editImageScale.set(scale);
		}

		if ( 0.1 >= activeObject.scaleX || 0.1 >= activeObject.scaleY ) {
			activeObject.scaleX = activeObject.baseScale;
			activeObject.scaleY = activeObject.baseScale;
			activeObject.top = activeObject.baseTop;
			activeObject.left = activeObject.baseLeft;
		}
		activeObject.lockMovementX = false;
		activeObject.lockMovementY = false;
	}

	// Object rotating event handler
	function _rotating ( /*[Object] event*/ e ) {
		var activeObject = cnv.getActiveObject(),
		angle = activeObject.get('angle');
		if ( is_text(activeObject) ) {
			editTextRotate.set( angle );
			window.tmpTextProps && window.tmpTextProps.setNEW( 'angle', angle );
		}
		else {
			editImageRotate.set(angle);
		}
	}

	// Object selecting event handler
	function _selected ( /*[Object] event*/ e ) {
		window.tmp_object_values = {
			set: function(key, value){
				this[key] = value;
			},
			get: function(key){
				return this[key];
			}
		};
		var activeObject = cnv.getActiveObject(),
		isText = is_text(activeObject);

		if ( isText ) {
			openEditTextBar();
			var top, left, text, fontFamily, scale, angle, fontWeight, fontStyle, textAlign, fill, OLDprops = {}, NEWprops = {};

			top = activeObject.get('top');
			left = activeObject.get('left');

			if ( activeObject.text ) {
				text = activeObject.text;
				textarea.value = text;
			}
			else {
				text = '';
				textarea.value = text;
			}

			if ( activeObject.fill ) {
				fill = activeObject.fill;
				editTextColor.value = fill;
				(_editTextColor.bind(editTextColor))();
			}
			else {
				fill = '#000'
				editTextColor.value = fill;
				(_editTextColor.bind(editTextColor))();
			}

			fontWeight = activeObject.get('fontWeight');
			if ( 'bold' === fontWeight ) {
				editTextFontWeight.checked = true;
				editTextCheckboxActivate.call(editTextFontWeight);
			}
			else {
				editTextFontWeight.checked = false;
				editTextCheckboxDeactivate.call(editTextFontWeight);
			}

			fontStyle = activeObject.get('fontStyle');
			if ( 'italic' === fontStyle ) {
				editTextFontStyle.checked = true;
				editTextCheckboxActivate.call(editTextFontStyle);
			}
			else {
				editTextFontStyle.checked = false;
				editTextCheckboxDeactivate.call(editTextFontStyle);
			}

			textAlign = activeObject.get('textAlign');
			if ( 'center' === activeObject.get('textAlign') ) {
				editTextAlign.checked = true;
				editTextCheckboxActivate.call(editTextAlign);
			}
			else {
				editTextAlign.checked = false;
				editTextCheckboxDeactivate.call(editTextAlign);
			}

			fontFamily = activeObject.get('fontFamily');
			document.querySelector('[data-font="' + fontFamily + '"]').click();

			scale = activeObject.get('scaleY') * 100;
			editTextScale.set( scale );

			angle = activeObject.get('angle');
			editTextRotate.set( angle );

			OLDprops = {
				top: top,
				left: left,
				target: activeObject,
				text: text,
				fontFamily: fontFamily,
				scale: scale,
				angle: angle,
				fontWeight: fontWeight,
				fontStyle: fontStyle,
				textAlign: textAlign,
				fill: fill
			};

			NEWprops = {
				top: top,
				left: left,
				target: activeObject,
				text: text,
				fontFamily: fontFamily,
				scale: scale,
				angle: angle,
				fontWeight: fontWeight,
				fontStyle: fontStyle,
				textAlign: textAlign,
				fill: fill
			};

			window.tmpTextProps = new TempTextProps( OLDprops, NEWprops );
		}
		else {
			editImageScale.set( activeObject.get('scaleY') * 100 );
			editImageRotate.set( activeObject.get('angle') );
			closeEditTextBar();
		}
	}

	// Object moving event handler
	function _moving ( /*[Object] event*/ e ) {
		var activeObject = cnv.getActiveObject(),
		x = activeObject.get('left'),
		y = activeObject.get('top'),
		xOffset = (cnv.width - canvasWidth) / 2,
		yOffset = (cnv.height - canvasHeight) / 1.55;

		if ( Math.round ( x ) < xOffset ) {
			activeObject.set({left: xOffset});
		}
		if ( Math.round ( y ) < yOffset ) {
			activeObject.set({top: yOffset});
		}
		if ( Math.round ( x ) > (cnv.width - xOffset) ) {
			activeObject.set({left: (cnv.width - xOffset)});
		}
		if ( Math.round ( y ) > (cnv.height - yOffset) ) {
			activeObject.set({top: (cnv.height - yOffset)});
		}

		if ( is_text(activeObject) ) {
			window.tmpTextProps && window.tmpTextProps.setNEW( 'top', activeObject.get('top') );
			window.tmpTextProps && window.tmpTextProps.setNEW( 'left', activeObject.get('left') );
		}

		activeObject.position.conversionOffsetX();
		activeObject.position.conversionOffsetY();
	}

	// Object deselecting event handler
	function _cancelEdit ( /*[Object] event*/ e ) {
		closeEditTextBar();
		editImageScale.set( 100 );
		editImageRotate.set( 0 );
		cnv.renderAll();
	}

	// canvas after render event handler
	function _afterRender ( /*[Object] event*/ e ) {
		var activeObject = cnv.getActiveObject();
		if ( activeObject && (0.1 >= activeObject.scaleX || 0.1 >= activeObject.scaleY) ) {
			activeObject.scaleX = activeObject.baseScale;
			activeObject.scaleY = activeObject.baseScale;
			activeObject.top = activeObject.baseTop;
			activeObject.left = activeObject.baseLeft;
		}
	}

	// canvas text edit in boundary box event handler
	function _textChanged ( /*[Object] event*/ e ) {
		var keyup = new Event('keyup');
		textarea.value = e.target.text;
		textarea.dispatchEvent(keyup);
	}

	// Slider image scale [update] handler
	function _updateImageScale ( values, handle ) {
		updateScale.call( this, values, handle );
	}

	// Slider image rotate [update] handler
	function _updateImageRotate ( values, handle ) {
		updateAngle.call( this, values, handle );
	}

	// Slider text scale [update] handler
	function _updateTextScale ( values, handle ) {
		updateScale.call( this, values, handle );
	}

	// Slider text rotate [update] handler
	function _updateTextRotate ( values, handle ) {
		updateAngle.call( this, values, handle );
	}

	// Slider image scale [change] handler
	function _changeImageScale ( values, handle ) {
		changeScale.call( this, values, handle );
	}

	// Slider image rotate [change] handler
	function _changeImageRotate ( values, handle ) {
		changeAngle.call( this, values, handle );
	}

	// Slider text scale [change] handler
	function _changeTextScale ( values, handle ) {
		changeScale.call( this, values, handle );
	}

	// Slider text rotate [change] handler
	function _changeTextRotate ( values, handle ) {
		changeAngle.call( this, values, handle );
	}

	// Window resize handler
	function _windowResize ( /*[Object] event*/ e ) {
		var tmp_objects = cnv._objects.slice(1, cnv._objects.length - 4), tmp_scale = 1;
		// var tmp_width = (cnvPlace.hasAttribute('makephotos'))? 1010 : screen.availWidth;
		if (cnvPlace.hasAttribute('makephotos')) {
			canvasHeight = defaultCanvasHeight;
			canvasWidth = defaultCanvasWidth;
			cnvPlace.style.maxHeight = '';
		}
		else {
			var k = cnv.width / resizeOverlayCheckpoint;
			if ( 1 > k ) {
				canvasHeight = defaultCanvasHeight * k;
				canvasWidth = defaultCanvasWidth * k;
				cnvPlace.style.maxHeight = (800 * k) + 'px';
				
			}
			else if ( cnvPlace.style.maxHeight !== '800px' ) {
				canvasHeight = defaultCanvasHeight;
				canvasWidth = defaultCanvasWidth;
				cnvPlace.style.maxHeight = '800px';
			}
		}

		if ( tmp_objects.length ) {
			for (var i = 0; i < tmp_objects.length; i++) {

				if ( cnv.OLD_canvasHeight !== canvasHeight ) {
					tmp_scale = canvasHeight / cnv.OLD_canvasHeight;
					tmp_objects[i].position.scaleOffsetY( tmp_scale );
					tmp_scale = 1;
				}

				if ( cnv.OLD_canvasWidth !== canvasWidth ) {
					tmp_scale = canvasWidth / cnv.OLD_canvasWidth;
					tmp_objects[i].position.scaleOffsetX( tmp_scale );
					tmp_scale = 1;
				}

				tmp_objects[i].size.conversion();
				tmp_objects[i].position.conversionOverlayOffset();
				tmp_objects[i].position.conversionOverlayOffset();
				tmp_objects[i].left = tmp_objects[i].position.canvasOffsetX + tmp_objects[i].position.overlayOffsetX;
				tmp_objects[i].top = tmp_objects[i].position.canvasOffsetY + tmp_objects[i].position.overlayOffsetY;
				// tmp_objects[i].position.conversionOffset();
			}
		}
		responsive(); setOverlay(); // Two functions call (responsive and setOverlay) need for double precision,
		responsive(); setOverlay(); // without this spine and zipper pulls are placed on canvas incorrect

		cnv.OLD_canvasHeight = canvasHeight;
		cnv.OLD_canvasWidth = canvasWidth;
		cnv.renderAll();
	}

	// Window load handler
	function _windowLoad ( /*[Object] event*/ e ) {
		_windowResize();
	}

	/***********************************Event handlers block**END***********************************/

	// Check object type
	// @return bool
	function is_text ( /*[Object] canvas*/ object ) {
		if ( object && object.type === 'text' || object && object.type === 'i-text' ) {
			return true;
		}
		return false;
	}

	// Check object type
	// @return bool
	function is_image ( /*[Object] canvas*/ object ) {
		if ( !( object && object.type === 'text' || object && object.type === 'i-text' ) ) {
			return true;
		}
		return false;
	}

	// Checkbox toggle state
	function editTextCheckboxToggle ( /*[Object] event*/ e ) {
		if ( this.checked ) {
			editTextCheckboxActivate.call(this);
		}
		else {
			editTextCheckboxDeactivate.call(this);
		}
	}

	// Checkbox checked state
	function editTextCheckboxActivate () {
		this.parentNode.style.borderColor = '#33bddf';
	}

	// Checkbox unchecked state
	function editTextCheckboxDeactivate () {
		this.parentNode.style.borderColor = '#e6e6e6';
	}

	// Open edit text block
	function openEditTextBar () {
		if ( !editTextBlock.classList.contains('is-edit') ) {
			editTextBlock.classList.add('is-edit')
		}
	}

	// Close edit textt block
	function closeEditTextBar () {
		window.tmpTextProps && window.tmpTextProps.OLD && activeObjectSetState ( window.tmpTextProps.OLD );
		window.tmpTextProps = undefined;
		if ( editTextBlock.classList.contains('is-edit') ) {
			editTextBlock.classList.remove('is-edit')
		}

		fontFamilyDefaultItem.click();
		selectedFontFamily = fontFamilyDefaultItem;

		textarea.value = '';
		editTextColor.value = '#000';
		editTextFontWeight.checked = false;
		editTextFontStyle.checked = false;
		editTextAlign.checked = false;
		editTextScale.set( 100 );
		editTextRotate.set( 0 );
	}

	// Slider scale update function
	// @return bool
	function updateScale ( /*number*/ values, /*number*/ handle ) {
		var activeObject = cnv.getActiveObject();
		var scale = Number(values[handle].substr(0, values[handle].length - 1)) / 100;
		if ( activeObject && this.target.firstChild.firstChild.firstChild.classList.contains('noUi-active') ) {
			activeObject.scale( scale );
			window.tmpTextProps && window.tmpTextProps.setNEW( 'scale', (scale * 100) );
			cnv.renderAll();
			// _scaling();
		}
		else {
			return false;
		}
	}

	// Slider scale change function
	// @return bool
	function changeScale ( /*number*/ values, /*number*/ handle ) {
		var activeObject = cnv.getActiveObject();
		var scale = Number(values[handle].substr(0, values[handle].length - 1)) / 100;
		if ( activeObject ) {
			activeObject.scale( scale );
			window.tmpTextProps && window.tmpTextProps.setNEW( 'scale', (scale * 100) );
			cnv.renderAll();
			// _scaling();
		}
		else {
			return false;
		}
	}
	// Slider rotate update function
	// @return bool
	function updateAngle ( /*number*/ values, /*number*/ handle ) {
		var activeObject = cnv.getActiveObject();
		var angle = Number(values[handle].substr(0, values[handle].length - 12));
		if ( activeObject && this.target.firstChild.firstChild.firstChild.classList.contains('noUi-active') ) {
			activeObject.set({angle: angle });
			window.tmpTextProps && window.tmpTextProps.setNEW( 'angle', angle );
			cnv.renderAll();
			// _rotating();
		}
		else {
			return false;
		}
	}
	// Slider rotate change function
	// @return bool
	function changeAngle ( /*number*/ values, /*number*/ handle ) {
		var activeObject = cnv.getActiveObject();
		var angle = Number(values[handle].substr(0, values[handle].length - 12));
		if ( activeObject ) {
			activeObject.set({angle: angle });
			window.tmpTextProps && window.tmpTextProps.setNEW( 'angle', angle );
			cnv.renderAll();
			// _rotating();
		}
		else {
			return false;
		}
	}

	// Window onresize conversion and rerender canvases objects and demensions
	function responsive() {

		renderSpine();

		cnvPlace.style.height = (800) + "px";

		cnvWidth = cnvWrapper.offsetWidth; // canvas responsive block width
		cnvHeight = cnvWrapper.offsetHeight; // canvas responsive block height

		var width = (window.innerWidth > 0) ? cnvWidth : screen.width,
		height = (window.innerHeight > 0) ? cnvHeight : screen.height,
		widthn = width,
		heightn = height;

		cnv.setDimensions({
			width: widthn,
			height: heightn
		});
	}

	// // Change canvases objects position onresize window
	// function responsiveMoveObjects() {
	// 	if ( window.OLD_canvas_size && window.OLD_canvas_size.w !== cnv.width ) {
	// 		var tmp_objects = cnv._objects.slice(1, cnv._objects.length - 4);

	// 		if ( tmp_objects.length ) {
	// 			for (var i = 0; i < tmp_objects.length; i++) {

	// 				// console.log('tmp_objects[i].left', tmp_objects[i].left);
	// 				// console.log('tmp_objects[i].position.canvasOffsetX', tmp_objects[i].position.canvasOffsetX);
	// 				// console.log('tmp_objects[i].position.overlayOffsetX', tmp_objects[i].position.overlayOffsetX);

	// 				// console.log('tmp_objects[i].top', tmp_objects[i].top);
	// 				// console.log('tmp_objects[i].position.canvasOffsetY', tmp_objects[i].position.canvasOffsetY);
	// 				// console.log('tmp_objects[i].position.overlayOffsetY', tmp_objects[i].position.overlayOffsetY);
	// 			}
	// 			cnv.renderAll();
	// 		}
	// 	}
	// 	window.OLD_canvas_size = {
	// 		w: cnv.width || 0,
	// 		h: cnv.height || 0
	// 	}
	// }
	// responsiveMoveObjects();

	// Set new or old state object on apply or cancel edit mode
	// @return bool
	function activeObjectSetState ( /*[Object] TempTextProps*/ object ) {
		if ( object && object.target ) {
			object.top && object.target.set({top: object.top});
			object.left && object.target.set({left: object.left});
			if ( object.text || '' === object.text ) {
				object.target.text = object.text;
			}
			object.fontFamily && object.target.set({fontFamily: object.fontFamily});
			( object.scale || 0 === object.scale ) && object.target.scale(object.scale / 100);
			( object.angle || 0 === object.angle ) && object.target.rotate(object.angle);
			object.fontWeight && object.target.set({fontWeight: object.fontWeight});
			object.fontStyle && object.target.set({fontStyle: object.fontStyle});
			object.textAlign && object.target.set({textAlign: object.textAlign});
			object.fill && object.target.set({fill: object.fill});

			cnv.renderAll();
			return true;
		}
		return false;
	}

	// Canvas overlay setter
	function setOverlay() {
		for (var i = 0; i < overlay.objectTitles.length; i++) {
			if ( null === overlay[overlay.objectTitles[i]].object ) {
				overlay[overlay.objectTitles[i]].object = new fabric.Rect();
				cnv.add(overlay[overlay.objectTitles[i]].object);
				overlay[overlay.objectTitles[i]].object.setControlsVisibility({'mr': false, 'ml': false, 'mt': false, 'mb': false});
			}

			overlay[overlay.objectTitles[i]].object.set({
				fill: ( "function" === typeof overlay[overlay.objectTitles[i]].fill)? overlay[overlay.objectTitles[i]].fill(): overlay[overlay.objectTitles[i]].fill,
				width: overlay[overlay.objectTitles[i]].width( cnv.width ),
				height: overlay[overlay.objectTitles[i]].height( cnv.height ),
				originX: 'center',
				originY: 'center',
				selectable: false,
				top: overlay[overlay.objectTitles[i]].top( cnv.height ),
				left: overlay[overlay.objectTitles[i]].left( cnv.width ),
				strokeWidth: 0,
				stroke: 'rgba(127, 127, 127, 0.25)'
			});
		}
		setObjectsOrder();
	}

	// Canvases objects order setter
	function setObjectsOrder () {
		window.orderArray = [].concat(
			overlay['middle'].object,
			window.$imageObjects,
			window.$textObjects,
			overlay['top'].object,
			overlay['bottom'].object,
			overlay['left'].object,
			overlay['right'].object
			);

		for (var i = 0; i < orderArray.length; i++) {
			cnv.moveTo(orderArray[i], i + 1);
			orderArray[i]['zIndex'] = i + 1;
		}
		cnv.renderAll();
	}

	// Canvas overlay without opacity for genereted cases image
	window.whiteOverlay = function () {
		window.overlay.set('top', 'fill', '#ffffff');
		window.overlay.set('bottom', 'fill', '#ffffff');
		window.overlay.set('left', 'fill', '#ffffff');
		window.overlay.set('right', 'fill', '#ffffff');

		setOverlay();

		window.overlay.set('top', 'fill', 'rgba(255, 255, 255, 0.5)');
		window.overlay.set('bottom', 'fill', 'rgba(255, 255, 255, 0.5)');
		window.overlay.set('left', 'fill', 'rgba(255, 255, 255, 0.5)');
		window.overlay.set('right', 'fill', 'rgba(255, 255, 255, 0.5)');
	};

	// Class for storage properties active object
	var TempTextProps = function ( OLD, NEW ) {
		this.OLD = OLD || {};
		this.NEW = NEW || {};

		this.getOLD = function ( key ) {
			return this.OLD[key];
		}
		this.setOLD = function ( key, value ) {
			this.OLD[key] = value;
		}
		this.getNEW = function ( key ) {
			return this.NEW[key];
		}
		this.setNEW = function ( key, value ) {
			this.NEW[key] = value;
		}
	}

	// renderSpine () - Function of calculating the position of elements in different states
	function renderSpine () {
		var width, height,
		state = cnvPlace.getAttribute('state'),
		device = cnvPlace.getAttribute('device');

		if ( '1' === state ) {

			height = (canvasHeight + 10);
			width = height * projections[state].spine.proportion;
			projections.spineElement.style.width = height + 'px';
			projections.spineElement.style.height = width + 'px';
			projections.spineElement.style.backgroundSize = height + 'px ' + width + 'px';
			projections.spineElement.style.top = ((cnv.height - width) / 2) + 'px';
			projections.spineElement.style.left = ((cnv.width - canvasWidth) / 2 - height / 2) + 'px';

			height = 70;
			width = height * projections[state].slider.proportion;
			projections.zipperSliderElement.style.width = width + 'px';
			projections.zipperSliderElement.style.height = height + 'px';
			projections.zipperSliderElement.style.backgroundSize = width + 'px ' + height + 'px';
			projections.zipperSliderElement.style.top = (cnv.height - (cnv.height - canvasHeight) / 2) + 'px';
			projections.zipperSliderElement.style.left = ((cnv.width / 2) - (canvasWidth / 3.5)) + 'px';

			projections.zipperElement.style.display = 'none';
		}
		else if ( '2' === state ) {
			width = 690;
			height = width * projections[state].spine.proportion;
			projections.spineElement.style.width = width + 'px';
			projections.spineElement.style.height = height + 'px';
			projections.spineElement.style.backgroundSize =  width + 'px ' + height + 'px';
			projections.spineElement.style.top = 488 + 'px';
			projections.spineElement.style.left = ((cnv.width - width) / 2 - 2) + 'px';

			projections.zipperElement.style.display = 'none';
		}
		else if ( '3' === state ) {
			if ( 'phone' === device ) {
				width = 460;
				height = width * projections[state].spine.proportion;
				projections.spineElement.style.width = width + 'px';
				projections.spineElement.style.height = height + 'px';
				projections.spineElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.spineElement.style.top = 112 + 'px';
				projections.spineElement.style.left = 275 + 'px';

				projections.zipperElement.style.width = width + 'px';
				projections.zipperElement.style.height = height + 'px';
				projections.zipperElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.zipperElement.style.top = 364 + 'px';
				projections.zipperElement.style.left = 447 + 'px';
				projections.zipperElement.style.display = 'block';
			}
			if ( 'tablet' === device ) {
				width = 417;
				height = width * projections[state].spine.proportion;
				projections.spineElement.style.width = width + 'px';
				projections.spineElement.style.height = height + 'px';
				projections.spineElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.spineElement.style.top = 73.5 + 'px';
				projections.spineElement.style.left = 306 + 'px';

				projections.zipperElement.style.width = width + 'px';
				projections.zipperElement.style.height = height + 'px';
				projections.zipperElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.zipperElement.style.top = 391.4 + 'px';
				projections.zipperElement.style.left = 471 + 'px';
				projections.zipperElement.style.display = 'block';
			}
			if ( 'laptop' === device ) {
				width = 418;
				height = width * projections[state].spine.proportion;
				projections.spineElement.style.width = width + 'px';
				projections.spineElement.style.height = height + 'px';
				projections.spineElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.spineElement.style.top = 82 + 'px';
				projections.spineElement.style.left = 299 + 'px';

				projections.zipperElement.style.width = width + 'px';
				projections.zipperElement.style.height = height + 'px';
				projections.zipperElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.zipperElement.style.top = 383 + 'px';
				projections.zipperElement.style.left = 473 + 'px';
				projections.zipperElement.style.display = 'block';
			}
		}
		else if ( '4' === state ) {
			if ( 'phone' === device ) {
				height = 270;
				width = height * projections[state].spine.proportion;
				projections.spineElement.style.width = width + 'px';
				projections.spineElement.style.height = height + 'px';
				projections.spineElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.spineElement.style.top = 158 + 'px';
				projections.spineElement.style.left = 335 + 'px';

				height = 162;
				width = 428; // height / projections[state].spine.proportion;
				projections.zipperElement.style.width = width + 'px';
				projections.zipperElement.style.height = height + 'px';
				projections.zipperElement.style.backgroundSize = 100 + '%';
				projections.zipperElement.style.top = 508 + 'px'; // 505 
				projections.zipperElement.style.left = 284 + 'px';
				projections.zipperElement.style.display = 'block';
			}
			if ( 'tablet' === device ) {
				height = 250;
				width = height * projections[state].spine.proportion;
				projections.spineElement.style.width = width + 'px';
				projections.spineElement.style.height = height + 'px';
				projections.spineElement.style.backgroundSize =  width + 'px ' + height + 'px';
				projections.spineElement.style.top = 160 + 'px';
				projections.spineElement.style.left = 323 + 'px';

				height = 164;
				width = 429; // height / projections[state].spine.proportion;
				projections.zipperElement.style.width = width + 'px';
				projections.zipperElement.style.height = height + 'px';
				projections.zipperElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.zipperElement.style.top = 515 + 'px'; // 505 
				projections.zipperElement.style.left = 280.5 + 'px';
				projections.zipperElement.style.display = 'block';
			}
			if ( 'laptop' === device ) {
				height = 418;
				width = height * projections[state].spine.proportion;
				projections.spineElement.style.width = width + 'px';
				projections.spineElement.style.height = height + 'px';
				projections.spineElement.style.backgroundSize = width + 'px ' + height + 'px';
				projections.spineElement.style.top = 85 + 'px';
				projections.spineElement.style.left = 299 + 'px';

				height = 162;
				width = 428; // height / projections[state].spine.proportion;
				projections.zipperElement.style.width = width + 'px';
				projections.zipperElement.style.height = height + 'px';
				projections.zipperElement.style.backgroundSize = 100 + '%';
				projections.zipperElement.style.top = 514 + 'px'; // 505 
				projections.zipperElement.style.left = 284 + 'px';
				projections.zipperElement.style.display = 'block';
			}
		}
		else if ( '5' === state ) {
			projections.zipperElement.style.display = 'none';
			height = (canvasHeight + 10);
			width = height * projections[state].spine.proportion;
			projections.spineElement.style.width = height + 'px';
			projections.spineElement.style.height = width + 'px';
			projections.spineElement.style.backgroundSize = height + 'px ' + width + 'px';
			projections.spineElement.style.top = ((cnv.height - width) / 2) + 'px';
			projections.spineElement.style.left = ((cnv.width - height) / 2) + 'px';

			height = canvasHeight;
			width = height * projections[state].backface.proportion;
			projections.backfaceElement.style.width = width + 'px';
			projections.backfaceElement.style.height = height + 'px';
			projections.backfaceElement.style.backgroundSize =  width + 'px ' + height + 'px';
			projections.backfaceElement.style.top = ((cnv.height - height) / 2) + 'px';
			projections.backfaceElement.style.left = ((cnv.width - width) / 2) + 'px';

			projections.zipperElement.style.display = 'none';
		}
	}
	// /renderSpine () - Function of calculating the position of elements in different states

	// spineDisplay( display ) - spine display setter
	function spineDisplay( display ) {
		var elem = document.querySelector('#spine');
		if ( elem && display ) {
			elem.style.display = display;
		}
	}
	// /spineDisplay( display ) - spine display setter

	// preloader ( active, state ) - preloader state setter
	function preloader ( /*bool*/ active, /*number*/state ) {
		if ( !DEBUG ) {
			var target = document.querySelector('.preloader'),
			state = state || 1,
			focus = document.querySelector('#preload-current-state');
			window.moveTo(0, 0);
			focus.innerHTML = state;
			if ( active ) {
				if ( !target.classList.contains('active') ) {
					target.classList.add('active');
				}
			}
			else {
				if ( target.classList.contains('active') ) {
					target.classList.remove('active');
				}
			}
		}
	}
	// /preloader ( active, state ) - preloader state setter

	// Function-interface for creating images in different projections
	function iMakePhotos( /*[Object] event*/ e, /*[Function] calback*/ callback ) {
		var callback = callback || false;
		cnv.discardActiveObject();
		cnv.renderAll();
		cnv.setDimensions({
			width: 1010,
			height: 800
		});
		var states = [1, 2, 3, 4, 5],
		targetElem = document.querySelector('.canvas-block__draw-place');
		window.projectionPng = [];
		targetElem.setAttribute('makephotos', '');
		cnv.height = 800;
		cnv.width = 1010;
		_windowResize(e);
		makePhotos( states, targetElem, callback );
	}
	// /Function-interface for creating images in different projections

	// Recursive function for creating images of different projections
	function makePhotos( /*[Array] number*/ states, /*[Object] DOM*/ targetElem, /*[Function] calback*/ callback ) {
		setOverlay();
		var state = states.shift();
		preloader(true, state);
		targetElem.setAttribute('state', ''+state);
		whiteOverlay();
		renderSpine();
		if ( state === 2 ) {
			genereteCanvasProjectionImage(120, 200, function(){
				domtoimage
				.toPng(targetElem)
				.then(function (dataUrl) {
					var tmp_obj = {
						title: 'state-' + state + '.png',
						href: dataUrl
					};
					var img = new Image();
					img.src = dataUrl;
					DEBUG && document.body.appendChild(img);
					window.projectionPng.push(tmp_obj);
					if ( states.length > 0 ) {
						makePhotos( states, targetElem );
					}
					else {
						targetElem.removeAttribute('makephotos');
						targetElem.setAttribute('state', '1');
						_windowResize();
						_windowResize();
						_windowResize();
						preloader(false);
						requestOnServer();
					}
				});
			});
		}
		else if ( state === 4 ) {
			genereteCanvasProjectionImage(120, 250, function(){
				domtoimage
				.toPng(targetElem)
				.then(function (dataUrl) {
					var tmp_obj = {
						title: 'state-' + state + '.png',
						href: dataUrl
					};
					var img = new Image();
					img.src = dataUrl;
					DEBUG && document.body.appendChild(img);
					window.projectionPng.push(tmp_obj);
					if ( states.length > 0 ) {
						makePhotos( states, targetElem );
					}
					else {
						targetElem.removeAttribute('makephotos');
						targetElem.setAttribute('state', '1');
						_windowResize();
						_windowResize();
						_windowResize();
						preloader(false);
						requestOnServer();
					}
				});
			});
		}
		else {
			genereteCanvasProjectionImage(null, null, function(){
				domtoimage
				.toPng(targetElem)
				.then(function (dataUrl) {
					var tmp_obj = {
						title: 'state-' + state + '.png',
						href: dataUrl
					};
					var img = new Image();
					img.src = dataUrl;
					DEBUG && document.body.appendChild(img);
					window.projectionPng.push(tmp_obj);
					if ( states.length > 0 ) {
						makePhotos( states, targetElem );
					}
					else {
						targetElem.removeAttribute('makephotos');
						targetElem.setAttribute('state', '1');
						_windowResize();
						_windowResize();
						_windowResize();
						preloader(false);
						requestOnServer();
					}
				});
			});
		}
	}
	// /Recursive function for creating images of different projections

	// created tepmorary Image for generete canvas screenshot in perspective
	var temporaryImage = new Image();
	temporaryImage.id = "temporaryImage";

	// Function for render perspective without css perspective
	// @return Object
	genereteCanvasProjectionImage = function( /*number*/ x, /*number*/ y, /*[Function]*/ callback){
		var elem = document.getElementById('temporaryImage');
		elem && elem.parentNode.removeChild(elem);
		document.querySelector('.canvas-container').style.display = "block";

		if ( x && y ) {
			var canvasBlockDraw = d.querySelector('.canvas-block__draw');
			var x = x || 0;
			var y = y || 0;
			cnvPlace.classList.add('forSnapshot');
			spineDisplay( 'none' );
			domtoimage
			.toPng(cnvPlace)
			.then(function(dataUrl){
				temporaryImage.src = dataUrl;
			})
			.then(function(){
				var cfx = fx.canvas();
				var texture = cfx.texture(temporaryImage);

				var perspectiveProp = {
					old: [0,0,1009,0,0,799,1009,799],
					new: [300,300,709,300,0,799,1009,799]
				};
				perspectiveProp.new[0] = perspectiveProp.old[0] + x;
				perspectiveProp.new[1] = perspectiveProp.old[1] + y;
				perspectiveProp.new[2] = perspectiveProp.old[2] - x;
				perspectiveProp.new[3] = perspectiveProp.old[3] + y;
				perspectiveProp.new[4] = perspectiveProp.old[4] - x / 1.5;
				perspectiveProp.new[5] = perspectiveProp.old[5] - y / 1.5;
				perspectiveProp.new[6] = perspectiveProp.old[6] + x / 1.5;
				perspectiveProp.new[7] = perspectiveProp.old[7] - y / 1.5;
				cfx
				.draw(texture)
				.perspective(
					[
					perspectiveProp.old[0],
					perspectiveProp.old[1],
					perspectiveProp.old[2],
					perspectiveProp.old[3],
					perspectiveProp.old[4],
					perspectiveProp.old[5],
					perspectiveProp.old[6],
					perspectiveProp.old[7]
					],
					[
					perspectiveProp.new[0],
					perspectiveProp.new[1],
					perspectiveProp.new[2],
					perspectiveProp.new[3],
					perspectiveProp.new[4],
					perspectiveProp.new[5],
					perspectiveProp.new[6],
					perspectiveProp.new[7]
					]
					)
				.update();
				temporaryImage.src = cfx.toDataURL('image/png');
				spineDisplay( 'block' );

				canvasBlockDraw.appendChild(temporaryImage);
				document.querySelector('.canvas-container').style.display = "none";
				cnvPlace.classList.remove('forSnapshot');
			})
			.then(function(){
				if ( 'function' === typeof callback ) {
					callback();
				}
			})
			.catch(function( e ){
				log( 'Error:', e );
			});
		}
		else if ( 'function' === typeof callback ) {
			callback();
		}
	};

	// if DEBUG is active:
	//  - added state control buttons
	//  - in generete projections added them into body end
	//  - hide preloader
	if ( DEBUG ) {
		var controlsPlace = document.querySelector('.canvas-block__controls-inner'),
		elem;
		for (var i = 5; i >= 1; i--) {
			elem = document.createElement('button');
			elem.innerHTML = 'State ' + i;
			elem.setAttribute('data-target', i);
			elem.id = 'state-' + i;
			elem.addEventListener('click', canvasPlaceStateChange);
			controlsPlace.insertBefore(elem, controlsPlace.firstChild);
			elem = undefined;
		}

		function canvasPlaceStateChange( /*[Object] event*/ e ){
			var target = this.getAttribute('data-target');

			cnvPlace.setAttribute('state', target);
			responsive();
		}
	}

	function log() {
		if ( DEBUG ) {
			for (var i = 0; i < arguments.length; i++) {
				console.log('arguments[' + i + ']:', arguments[i]);
			}
		}
	}

	function requestOnServer () {
		jQuery(function($){
			var data = getCaseInfo();
			!DEBUG && $.ajax( constructorRequest( data ) );
			DEBUG && console.log( constructorRequest( data ) );
		});
	}

	// Getter for getting all the information about the case
	// @return Object
	window.getCaseInfo = function() {
		var _return = {
					objects: [].concat( window.$imageObjects, window.$textObjects ),             // ['objects']          - contains canvas objects
					colors: window.currentColor,                                                 // ['colors']           - contains all information about the colors
					projectionPng: window.projectionPng,                                         // ['projectionPng']    - contains objects of projections
					device: window.device                                                        // ['device']           - contains information about the device
				}
				return _return;
			}
	// /Getter for getting all the information about the case
	
	/***********************************Plugin init block*START*************************************/

	// Spectrum (Color picker) init
	$("#edit-color").spectrum({
		replacerClassName: 'text-module__edit-other-btn text-module__edit-other-btn--color',
		change: function(color) {
			this.value = color.toHexString();
			var event = new Event("change");
			this.dispatchEvent(event);
		}
	});
	// /Spectrum (Color picker) init

	/***********************************Plugin init block**END**************************************/
})(document);