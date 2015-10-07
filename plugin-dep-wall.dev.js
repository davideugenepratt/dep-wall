(function ( $ ) {
 
    $.fn.depWall = function( options ) {
                
        var wall = $( this );
        
        columnify( wall , options );
        
        $( window ).resize( wall , function() {
            
            columnify( wall , options );			
            
        });	
        
        return this;               
        
    };
    
    function columnify( wall, options ) {
        
        // We only want to use the calculated numColumns if it is not smaller than the minColumns option
        var numColumns = Math.max( Math.ceil( wall.width() / options.maxWidth ) , options.minColumns );        
        
        if ( wall.children( '.column' ).length === numColumns ) { return false; }
        
        console.info( wall.width() + " / " + options.maxWidth + " = " + numColumns );
        
        // Since I use Bootstrap a lot I'm adding int he bootstrap classes if the columns.      
        var bootstrapColumns = ( 12 % numColumns === 0 ) ? "col-xs-" + ( 12 / numColumns ) : "";
        
        var bricks = wall.find( '.' + options.brick );
                
        wall.children( '.column' ).detach();
        
        for( i = 0; i < numColumns; i++ ) {            
            
            wall.prepend( '<div class="column column'+numColumns+' '+bootstrapColumns+'" ></div>' );
        
        }        
                
        bricks.each( function( index ) {
           
           // If the data-index is set then this means that the wall has already been initialized and the index should stay in the order of the initialization
           index = ( $( this ).data( "index" ) ) ? $( this ).data( "index" ) : index;           
           
           column = ( index % numColumns === 0 ) ? 0 : index % numColumns; 
                      
           $( this ).data( "index" , index ).detach().appendTo( wall.children( '.column' ).eq( column ) );                      
                       
        }); 
                        
    }
 
}( jQuery ));