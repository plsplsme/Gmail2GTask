# Gmail2GTask
The google app script create Gmail task out of your email.
This is still under development.

## How to use
You send the email with particular subject prefix. And then the GAS create the Task out of the email.

For example:  

Subject: G2T_ADD_TASK Check the cat food  
Body: How many cat food we have?  

By sending above email, GAS creates Task like following.  
Title: Check the cat food  
Note: How many cat food we have?  

Gmail2Task only parse fist line of the body.

## How to install

Copy *.gs files to google app script and set following script properties.

VALID_SUBJECT: Prefix of the subject. In above example, it is "G2T_ADD_TASK".  
TAKS_LIST_NAME: Task list name you want to put the Task into.

Set the time-driven trigger and run `productionMain()`. I tested with every 5 min.

Enjoy!
