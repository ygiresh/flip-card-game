	$(document).ready(function() {
	    var r;
	    var chances;
	    var col = 0;
	    var row = 0;
		$('#score-board').hide();
		$( "#gamenum" ).keypress(function(e) {

			while($(this).val().length <=8){
			if (e.keyCode <47 || e.keyCode > 57){
				$('#gamenumerrmsg').text("Integers only !");
				return false;
			}else{
				if($(this).val() >=999){
		    $('#gamenumerrmsg').text(" ");
			}else{
		    $('#gamenumerrmsg').text("Minimum value is 999!");
			}
			return true;
			
			}
			}
			$('#gamenumerrmsg').text("Maximum 9 digits Only !");
			return false;
		});
	  
	    $('.toggle-button').click(function() {
	        $(this).find('div').toggleClass('active').toggleClass('non-active');
	        chances = $(this).find('.active').find('span').text();
	    });
	
			
	    $('#col-plus').click(function() {
			
	        col = parseInt($('#col').val());
	        if (col >= 5) {
	            var colerrmsg = 'Maximum 5 Columns !';
	            $('#col-msg').text(colerrmsg);
	        } else {
	            col += 1;
	            $('#col').val(col);
	            $('#col-msg').text("");
	        }
	        return this.col;
	    });

	    $('#col-minus').click(function() {
			
	        col = parseInt($('#col').val());
	        if (col <= 3) {
	            var colerrmsg = 'Minimum 3 Columns !';
	            $('#col-msg').text(colerrmsg);
	        } else {
	            col -= 1;
	            $('#col').val(col);
	            $('#col-msg').text("");
	        }
	        return this.col;
	    });

	    $('#row-plus').click(function() {
			
	        row = parseInt($('#row').val());
	        if (row >= 5) {
	            var rowerrmsg = 'Maximum 5 rows !';
	            $('#row-msg').text(rowerrmsg);
	        } else {
	            row += 1;
	            $('#row').val(row);
	            $('#row-msg').text("");
	        }
	        return this.row;
	    });

	    $('#row-minus').click(function() {
			
	        row = parseInt($('#row').val());
	        if (row <= 3) {
	            var rowerrmsg = 'Minimum 3 rows!';
	            $('#row-msg').text(rowerrmsg);
	        } else {
	            row -= 1;
	            $('#row').val(row);
	            $('#row-msg').text("");
	        }
	        return this.row;
	    });

	    document.getElementById('load-flex').onclick = function() {
			
			flipnum = [];
			$('#toggle-button').addClass("disabled");
			$("#load-flex").text('Have Fun Flipping Cards');
				
			$('#col').addClass("disabled");
			$('#row').addClass("disabled");
			x = 1;
	       var width = $(window).width();
		   var height = $(window).height();
	        row = parseInt($('#row').val());
	        col = parseInt($('#col').val());
	        chances = $('.toggle-button').find('.active').find('span').text();
			flips = parseInt(chances);
	        var gamenum = document.getElementById("gamenum").value;
			if(gamenum >= 999){
	        var num = [];
	        var arrLen = col * row;
	        var total = chances * gamenum;
	        var sum = 0;
	        r = randomSum(arrLen, total);
	        
	        var s = '<ul id="flexParent" class="flex-container">'
			var listcls;
			switch(col) {
			case 5:
			listcls = "col-sm-5ths";
			break;
			case 4:
			listcls = "col-sm-3 col-xs-3";
			break;
			default:
			listcls ="col-sm-4 col-xs-4";
			}
	        for (var i = 0; i < r.length; ++i) {
	            s += '<li class="'+listcls+'"><div class="flex-item" ><div id="front" class="face front">?</div><div id="back" class="face back">' + r[i] + '</div></div></li>';

	        }
	        s += '</ul>';
			
			
	        document.getElementById("flex").innerHTML = s;
		    $('#flex-load').text('Enjoy Flipping!');
			}
	        $('#flexParent li').click(function(e) {
				
				if(flips >= 1){
				
	            var $this = $(this);
	            $(this).find('.flex-item').addClass('flipped');
	            var elemnt = $(this).find("#back");
				var randColor = Math.floor(Math.random()*(999999-100000+1)+100000);
				
				$('#score-board').show();
				$('#score-board').find('.panel-body').append('<p style="color:#'+randColor+'">Flip #'+x+' = '+elemnt.text()+'</p>');
				flipnum.push(parseInt(elemnt.text()));
				x++;
				flips--;
	            if (elemnt.text().length > 3 && elemnt.text().length <= 9) {
	                var fntSize = 45 - ((elemnt.text().length - 3) * 5);
	                elemnt.css("font-size", fntSize.toString() + 'px');  
	            }
	            if ($(window).width() <= 414 && $(window).height() <= 750) {
					elemnt.html(' ');
	                elemnt.html('<i class="glyphicon glyphicon-ok-circle"></i>');
	            }
				
				if(flips==0){
					
					flag = true;
					gamecomplete(flag,flipnum);
				}
	            return false;
				}
				
			});
			

	    };


		var gamecomplete = function(f,flpnum){
			
			if(f){
				$("#score-board").find('.panel-footer').append(flpnum.join('+') +' = ' + eval(flpnum.join('+')));
				$("#load-flex").hide();
				$('ul.flex-container').find('.flex-item').removeClass('flipped');
				//$('ul.flex-container').css("backgroundColor","pink");
			    $('.back').css({"-webkit-animation-name": "card1Flip","-webkit-animation-duration":" 1s","-webkit-animation-iteration-count": "infinite","-webkit-animation-timing-function": "linear"});	
				$('.flex-item').css({"-webkit-animation-name": "card1Flip","-webkit-animation-duration":" 0.9s","-webkit-animation-iteration-count": "20","-webkit-animation-timing-function": "linear"});	
				$('.flex-item').css({"-webkit-animation-name": "rolldown-items","-webkit-animation-duration":" 0.9s","-webkit-animation-timing-function": "linear"});
			}
			flag=false;
		};
		
	    var randomSum = function(n, t) {
	        var max = n * (n + 1) / 2;
	        if (t < max) return 'Input error';
	        var list = [],
	            sum = 0,
	            i = n;
	        while (i--) {
	            var r = Math.random();
	            list.push(r);
	            sum += r;
	        }
	        var factor = t / sum;
	        sum = 0;
	        i = n;
	        while (--i) {
	            list[i] = parseInt(factor * list[i]);
	            sum += list[i];
	        }
	        list[0] = t - sum;
	        return list;
	    };
		
	});