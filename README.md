## Synopsis

The client would like an interface to help customers purchase custom
battery banks.  These battery banks will be made up of lithium-ion
18650's.  The specifications for the 18650's have a range of 3.7V to
4.2V and 1400mAh to 2600mAh (some China versions claim 5000mAh).

The price for these batteries can range from $1 to $10+ depending on
where you get them and brand name.  On eBay you get the 6 cell 11.1V
5200mAh laptop batters for about $12 (with free shipping) so that
comes out to $2 a cell.

http://bit.ly/1Dg1Tha


## Assignment 4 outline
=> Setup the layout and get it working
* Add look and feel using twitter bootstrap
* Connect to server to pull data for:
    - how many batteries are remain.
    - how many batteries have been sold.


Assignment 4 Part 1 Tasks:
1) Allow the user to input:
  * The number of batteries in each cell.
  * The number of cells.

2) Setup an area to represent a battery bank based on the input.

3) Assume the voltage of each batter is 4V at 2000mAh, and the price is $2/cell.

4) when the user presses the "Build battery" button it should build a
visual representation of the battery bank.  This can be done with
table-tags, div-tags, span-tags, ul-tags or whatever tag you feel
would work best.

5) There should be a place on the page to show total voltage and total
mAh along with the estimated cost.
  * Batteries / Cells in series the voltage is added together and the
current stays the same.
  * Batteries / Cells in parallel current is added and the voltage
stays the same.


When done please commit your code to a public github project you
created and send me the link.


Requirements:
1) Code must be indented 2 or 4 spaces.  Be consistent.
2) It must work when you turn it in so try it in at least two browsers
to make sure.
3) Everything is pass or fail.
4) Use the jQuery library where needed for this project.

References:
* table-tag : http://www.w3schools.com/tags/tag_table.asp
* div-tag : http://www.w3schools.com/tags/tag_div.asp
* span-tag : http://www.w3schools.com/tags/tag_span.asp
* ul-tag : http://www.w3schools.com/tags/tag_ul.asp
* li-tag : http://www.w3schools.com/tags/tag_li.asp

* jQuery :http://www.w3schools.com/js/js_lib_jquery.asp
* jQuery docs : http://api.jquery.com/