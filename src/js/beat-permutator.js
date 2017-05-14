$( document ).ready(function() {
	
    characterMap = {
        "F": "C",
        "L": "I",
        "R": "L",
        "X": "D",
        "O": "9"
    };

	$('#submit').click(function(e) {
		
		$('.fragments-list').empty();
		e.preventDefault();

		var voicesChecked = $('input[name=voices]:checked');
		var voices = _.map(voicesChecked, function(voice, idx) { return voicesChecked[idx].value }).join('');
		var steps = $('input[name=steps]:checked')[0].value;

		var chars = [];
		_.each(voices, function(voice) {
			chars.push(characterMap[voice]);
		});

		var permutations = getPermutations(chars.join(''), steps);

		_.each(permutations, function(perm, idx) {
			var tpl = _.template( $('#fragmentTpl').html() );
			$('.fragments-list').append( tpl({ 
				fragment: perm.split('').join('='),
				num: idx + 1,
				count: permutations.length
			}) );
		});

	});

	var changeAll = function (string, character, start = 0, end = 0) {
	    var stringArr = Array.from(string);
	    if (end == 0) { end = stringArr.length - 1; }
        for (var i = start; i <= end; i++) {
            stringArr[i] = character;
        }
	    return stringArr.join('');
	}

	var characterAdd = function (voices, string, idx) {
		var stringArr = Array.from(string);
	    if (stringArr[idx] != voices[voices.length-1]) {
	        stringArr[idx] = voices[voices.indexOf( string.charAt(idx) ) + 1];
	        return stringArr.join('');
	    } else {
	        string = changeAll( stringArr.join(''), voices.charAt(0), idx );
	   		return characterAdd(voices, string, idx-1);
	    }
	}

	var getPermutations = function (voices, steps) {
		var last = voices.charAt(0).repeat(steps);
		var arr = [];
		while(last !== voices[voices.length -1].repeat(steps)) {
			arr.push(last);
			last = characterAdd(voices, last, steps-1);
		}
		arr.push(last);
		return arr;
	}

});