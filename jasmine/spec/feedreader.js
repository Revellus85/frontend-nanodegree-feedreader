/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
   

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        
        it('has URL', function(){  
            for(i = 0; i < allFeeds.length; i++ ){          
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url).not.toBe(""); 
            }           
        });    


        it('has name', function(){  
            for(i = 0; i < allFeeds.length; i++ ){          
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name).not.toBe(""); 
            }           
        });
    });

    
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('should be hidden by default', function() {
            // stores a boolean indicating whether the body element's class list contains 'menu-hiden'
            var menuHidden = document.getElementsByTagName('body')[0].classList.contains('menu-hidden');
            // body element should have the menu-hidden class
            expect(menuHidden).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
         it('should change visibility when the menu icon is clicked', function() {
            // simulates a click on the menu-icon-link
            document.getElementsByClassName('menu-icon-link')[0].click();            
            var menuHidden = document.getElementsByTagName('body')[0].classList.contains('menu-hidden');
            // body element should not have the menu-hidden class
            expect(menuHidden).toBe(false);            
            document.getElementsByClassName('menu-icon-link')[0].click();            
            var menuHidden = document.getElementsByTagName('body')[0].classList.contains('menu-hidden');
            // body element should have the menu-hidden class
            expect(menuHidden).toBe(true);
        });
    });

    
    describe('Initial Entries', function() {
        beforeEach(function(done) {            
            loadFeed(0, done);
        });
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.         
         */
        it('should exist', function() {
            // checks to see if an object with class 'entry' has been loaded from feeds
            var feedEntry = document.querySelector('.feed');
            expect(typeof feedEntry.querySelectorAll('.entry')[0]).toBe("object");
        });
    });


    describe('New Feed Selection', function() {
        var oldEntry,
            newEntry;
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.         
         */
        beforeEach(function(done) {
            // loads the first feed
            loadFeed(0, function() {
                // stores the first entry as 'oldEntry'
                oldEntry = document.querySelector('.entry h2');
                // load new feed
                loadFeed(1, done);
            });

        });

        // Test that ensures when a new feed is loaded by the loadFeed function the content actually changes        
        it('content should update', function() {
            // stores the first entry as 'newEntry'
            newEntry = document.querySelector('.entry h2');
            // if the new entry is the same as the old entry, the new feed has not loaded
            expect(newEntry).not.toBe(oldEntry);
        });
    });
}());
