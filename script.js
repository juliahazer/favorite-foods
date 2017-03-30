$(function(){
	var $foodTableDiv = $('.foodTableDiv');
	var $foodForm = $('.foodForm');
	var $foodTableBody = $('.foodTableBody');

	$foodTableDiv.hide();

	$foodForm.submit(function(e){
		
		e.preventDefault();
		var favFood = $('#favFood').val()
		var rating = $('#rating').val();

		if(isNaN(rating) || (!(isNaN(rating)) && (rating > 10 || rating < 0 ))){

			alert("Please enter a rating between 0-10");
			$('.formRating').addClass('has-error has-feedback');
			if ($('.formRating').children('span').length === 0){
				$('.formRating').append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
			}
		}
		else {
			$('.formRating').removeClass('has-error has-feedback');
			$('.formRating').remove('span');

			$foodTableDiv.show();

			var htmlNewFoodRow = `<tr class="foodRow" data-food="${favFood}" data-rating="${rating}">
			        <td>${favFood}</td>
			        <td>${rating}</td>
			        <td><a class="btn-sm btn btn-danger deleteBtn">DELETE</a></td>
			        </tr>`

			$foodTableBody.prepend(htmlNewFoodRow);

			$('#favFood').val('');
			$('#rating').val('');
		}
	});

	$foodTableBody.on('click', '.deleteBtn', function(){
		$(this).parent().parent().remove();
		if (!$('.foodRow')[0]){
			$foodTableDiv.hide();
		}
	});

	$('.foodAsc').on('click', function(){
		sortRows(true, 'data-food');
	});

	$('.foodDsc').on('click', function(){
		sortRows(false, 'data-food');
	});

	$('.ratingAsc').on('click', function(){
		sortRows(false, 'data-rating');
	});

	$('.ratingDsc').on('click', function(){ 
		sortRows(true, 'data-rating')
	});

	function sortRows(ascTrue, attrSort){
		var rows = $('.foodRow').get();

		rows.sort(function(a,b){
			var a = $(a).attr(attrSort);
			var b = $(b).attr(attrSort);
			if(attrSort === 'data-rating'){
				a = Number(a);
				b = Number(b);
			}
			if (ascTrue){
				if (a<b){
					return -1;
				}
				if (a>b){
					return 1;
				}
			}
			else {
				if (b<a){
					return -1;
				}
				if (b>a){
					return 1;
				}
			}
			return 0;
		});

		$.each(rows, function(i,row){
			$foodTableBody.append(row);
		});
	}

})