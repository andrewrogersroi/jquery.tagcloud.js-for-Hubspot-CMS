Instructions for Hubspot CMS
------------

Upload file
-----------
    Download files from Github
    Unzip
    Go to Settings>File Manager
    If you don't have a folder for javascript files, create a folder called js.
        To Create a folder:
        Click on root folder   
        Select "New Folder"   
        Type in folder name
        Click "Ok"
    Click on the js folder or your existing javascript folder
    Select "Upload Files"
    Browse to where you saved "jquery.tagcloud.hs.js" on your computer
    Select the "jquery.tagcloud.js" file and click "Open"
    Click "Upload"

Format Code Snippet
-------------------
    On the Code below find this
    <script type="text/javascript" src="/Portals/[YOUR PORTAL ID]/js/jquery.tagcloud.js"></script>
    enter your Portal ID
    <script type="text/javascript" src="/Portals/12345/js/jquery.tagcloud.js"></script>
    If you are using an exisiting javascript folder, be sure to change the file path as well
    The color and font size ranges can also be changed to match your site and preference
    
Add to Page
-----------
    Go To Your Blog home page
    In the sidebar click "add module" 
    Under the Content tab, select "HTML/Javascript"
    Copy and paste the code snippet below into the text area.
    Check the box "Do not show module title"
    Check the box "Use plain container with no formatting"
    Click "Save"
    The new module will not place any visible content on the page, 
    but you should see the orange "Edit  Remove" box.
    Your Tags should now be formatted as a cloud!

Code Snippet
-------------

    <!-- Tag Cloud Scripts Starts Here -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js">
    </script>
    <script type="text/javascript">
     var $j = jQuery.noConflict();
    </script>
    <script type="text/javascript" src="/Portals/[YOUR PORTAL ID]/js/jquery.tagcloud.js">
    </script> 
    <script>
     $j(document).ready(function(){
      $j("ul#_TagList li a").hubtags();
      $j("ul#_TagList li a").tagcloud({
       size: {
       
        start: 10, //minimum font size
        end: 18, //maximum font size
        unit: 'px', // unit (px, pt, em, %)
        
       },
       color: {
   
    start: "#333333", //first color HEX value Help: http://www.w3schools.com/html/html_colors.asp
    end: "#000000" // second color HEX value

       }
      })
    });
    </script>
    <style>
      ul#_TagList {
      list-style-type:none!important;
      margin:0!important;
      }
      ul#_TagList li {
      display:inline!important;
      list-style-image:none!important;
      margin:0!important;
      
      padding:0!important;
      }
      ul#_TagList li a {
      text-decoration:none!important;
      margin:0!important;
      padding:0!important;}
    </style>
    <!-- Tag Clould Scripts Ends Here -->

