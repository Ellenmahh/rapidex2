$(function()
{

	// France elections
	window.initFranceElections = function()
	{
		$.getJSON( componentsPath + '../plugins/maps_vector/data/france-elections.json', function(data){
			new jvm.WorldMap({
				map: 'fr_merc_en',
				container: $('#france-2007'),
				backgroundColor: 'transparent',
				zoomOnScroll:false,
				series: {
					regions: [{
						scale: {
							'1': '#4169E1',
							'2': '#FF69B4'
						},
						attribute: 'fill',
						values: data['year2007'].results
					}]
				}
			});

			new jvm.WorldMap({
				map: 'fr_merc_en',
				container: $('#france-2012'),
				backgroundColor: 'transparent',
				zoomOnScroll:false,
				series: {
					regions: [{
						scale: {
							'1': '#FF69B4',
							'2': '#4169E1'
						},
						attribute: 'fill',
						values: data['year2012'].results
					}]
				}
			});
		});
	}
	
	$(window).on('load', function(){

		if ($('#maps_vector_tabs').length)
			return;

        if (!$('#france-2007').length || !$('#france-2012').length)
            return;

		setTimeout(function(){
			initFranceElections();
		}, 100);
	});
	
});