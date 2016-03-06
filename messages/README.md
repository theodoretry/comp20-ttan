### COMP 20 LAB 6 (MESSAGES) README

Theodore Tan
11 March 2016

1. All aspects of the work have been implemented correctly.

2. Thanks to Piazza and the links on the COMP20 website for helping me 
   understand the content.

3. I have spent approximately 1 hour completing the assignment and another 30 
   minutes reading the links.

4. Is it possible to request the data from a different origin or from your local
   machine (from file:///) from using XMLHttpRequest? Why or why not?

   No, it is not. Because of the same-origin policy, the XMLHttpRequest will 
   only be successful if it is made to the host that served the initial webpage.
   (i.e. the protocal, port, and host must all match)