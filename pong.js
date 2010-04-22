WORLD_SIZE_Y = 30;
WORLD_SIZE_X = 50;

PLATE_SIZE = 6;
TIME_INTERVAL = 30;

function block(position) {
    return $('#row_'+position.y+'_col_'+position.x);
}

function check_border_condition(position, vector, size) {
    if(position == size - 1) {
    	vector = -1;
    } else if(position == 0) {
    	vector = 1;
    } else {
    	vector = vector_map[Math.round(Math.random())]
    }
    return vector;
}

function add_vector(position, vector) {
    return { 
	'x': position.x + vector.x,
	'y': position.y + vector.y 
    }
	
}

$(document).ready( function () {
    
    playground = new Array();
    for(i=0; i<WORLD_SIZE_X; i++) {
	
        playground[i] = new Array();
	
	for(j=0; j<WORLD_SIZE_Y; j++){
	    playground[i][j] = 0;
	}
    }
    
    position = { 
	'x' : Math.round(Math.random()*(WORLD_SIZE_X-1)),
	'y' : Math.round(Math.random()*(WORLD_SIZE_Y-1))
    }
    
    vector_map = {
        0: -1,
        1: 1
    };
    
    vector = {
	'x' : vector_map[Math.round(Math.random())],
	'y' : vector_map[Math.round(Math.random())]
    }
    
    vector.x = check_border_condition(position.x, vector.x, WORLD_SIZE_X);
    vector.y = check_border_condition(position.y, vector.y, WORLD_SIZE_Y);
    
    l_plate = new Array();
    r_plate = new Array();
    for(i=0; i<WORLD_SIZE_Y; i++) {
	l_plate[i] = 0;
	r_plate[i] = 0;
	middle = Math.round(WORLD_SIZE_Y/2);
    }
    
    for(i=0; i<PLATE_SIZE; i++) {
	l_plate[middle-PLATE_SIZE/2+i] = 1;
	r_plate[middle-PLATE_SIZE/2+i] = 1;
    }
    
    for(i=0; i<WORLD_SIZE_Y; i++) {	
    	$('#l_plate')
    	    .append('<tr><td id="l_row_'+i+'"></td></tr>');
    	if (l_plate[i] == 1) {
    	    $('#l_plate td:last').addClass('platetd');
    	}
    	$('#r_plate')
    	    .append('<tr><td id="r_row_'+i+'"></td></tr>');
    	if (r_plate[i] == 1) {
    	    $('#r_plate td:last').addClass('platetd');
    	}
    }

    for(i=0; i<WORLD_SIZE_Y; i++) {
    	$('#playground').append('<tr></tr>');
    	for (j=0; j<WORLD_SIZE_X; j++) {
    	    $('#playground tr:last')
    		.append('<td class="block" id="row_'+i+'_col_'+j+'"></td>');
    	}
    };
    
    block(position).addClass('current_position');
    
    ///////////// play ///////////////
    $("#playground").everyTime(TIME_INTERVAL, function() {
    	if (position.x == 0 && vector.x == -1) {
    	    vector.x = 1;
     	    if (l_plate[position.y] != 1) {
    		block(position).removeClass('current_position');
    		position = { 
    		    'x' : Math.round(Math.random()*(WORLD_SIZE_X-1)),
    		    'y' : Math.round(Math.random()*(WORLD_SIZE_Y-1))
    		}
    	    }
    	}
    	if (position.y == 0 && vector.y == -1) {
    	    vector.y = 1;
    	}
	
    	if ((position.x == (WORLD_SIZE_X -1)) && vector.x == 1) {
    	    vector.x = -1;
    	    if (r_plate[position.y] != 1) {
    		block(position).removeClass('current_position');
    		position = { 
    		    'x' : Math.round(Math.random()*(WORLD_SIZE_X-1)),
    		    'y' : Math.round(Math.random()*(WORLD_SIZE_Y-1))
    		}
    	    }
    	}
	
    	if ((position.y == (WORLD_SIZE_Y -1)) && vector.y == 1) {
    	    vector.y = -1;
    	}

    	block(position).removeClass('current_position');
    	position = add_vector(position, vector);
    	block(position).addClass('current_position');
	
    });
   
    key_map = { 
    	65 : false, 
    	90 : false, 
    	76 : false, 
    	190 : false 
    }
    
    $(document).keydown(function(e){
    	if ( e.which == 65 ||
    	     e.which == 90 || 
    	     e.which == 76 || 
    	     e.which == 190 ) {
    	    key_map[e.which] = true;
	    
	    if( key_map[65] == true) { 
		begin = jQuery.inArray(1,l_plate);
		if(begin != 0) {
		    end = begin + PLATE_SIZE - 1;
		    l_plate[begin - 1] = 1;
		    l_plate[end] = 0;
		    $('#l_row_'+(begin-1)).addClass('platetd');
		    $('#l_row_'+end).removeClass('platetd');
		}
	    }

	    if( key_map[90] == true) { 
	    	begin = jQuery.inArray(1,l_plate);
		if(begin + PLATE_SIZE != WORLD_SIZE_Y) {
		    end = begin + PLATE_SIZE;
		    l_plate[begin] = 0;
		    l_plate[end] = 1;
		    $('#l_row_'+begin).removeClass('platetd');
		    $('#l_row_'+end).addClass('platetd');
		}
	    }

	    
	    if( key_map[76] == true) {
		begin = jQuery.inArray(1,r_plate);
		if(begin != 0) {
		    end = begin + PLATE_SIZE - 1;
		    r_plate[begin - 1] = 1;
		    r_plate[end] = 0;
		    $('#r_row_'+(begin-1)).addClass('platetd');
		    $('#r_row_'+end).removeClass('platetd');
		}
	    }

	    if( key_map[190] == true) {
		begin = jQuery.inArray(1,r_plate);
		if(begin + PLATE_SIZE != WORLD_SIZE_Y) {
		    end = begin + PLATE_SIZE;
		    r_plate[begin] = 0;
		    r_plate[end] = 1;
		    $('#r_row_'+begin).removeClass('platetd');
		    $('#r_row_'+end).addClass('platetd');
		}
	    }
    	}
    });
    
    $(document).keyup(function(e){
    	if (e.which == 65 ||
    	    e.which == 90 || 
    	    e.which == 76 || 
    	    e.which == 190 ) {
    	    key_map[e.which] = false;
    	}
    });
    
});
