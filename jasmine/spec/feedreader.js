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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
   

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
        it('has URL', function(){  
            for(i = 0; i < allFeeds.length; i++ ){          
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url).not.toBe(""); 
            }           
        });    

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has name', function(){  
            for(i = 0; i < allFeeds.length; i++ ){          
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name).not.toBe(""); 
            }           
        });
    });



    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            // stores a boolean indicating whether the body element's class list contains 'menu-hiden'
            var menuHidden = document.getElementsByTagName('body')[0].classList.contains('menu-hidden');
            // body element should have the menu-hidden class
            expect(menuHidden).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
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

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {            
            loadFeed(0, done);
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should exist', function() {
            // checks to see if an object with class 'entry' has been loaded
            expect(typeof document.getElementsByClassName('entry')[0]).toBe("object");
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldEntry,
            newEntry;
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
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
