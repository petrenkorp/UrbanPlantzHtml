

<?php
/*
Three Tables:

PlantNodes
PlantType
Users

Required Queries:

PlantNodes
1. Get all nodes 
Ex: http://urbanplants.ca/dbConnect.php?table=PlantNodes

**NOTE: If 0 then send all -> See if this can be done

2. Get all nodes specific to a PlantType (1,2,3,4,5) on client side 1,2,3,4,5 corresponds to the plant types. )
Ex: http://urbanplants.ca/dbConnect.php?table=PlantNodes&PlantType=1
Returns: [{"node_id":"3","lat":"14.1","lng":"72.222","plantType":"1","discoverer":"Huge","confirmer":"MacD"},{"node_id":"4","lat":"41.61","lng":"62.64","plantType":"1","discoverer":"testJoe","confirmer":""}]
**3. Get all nodes within a radius of X kms 
4. Combination of 2 and 3
5. Insert Node:
Ex: http://urbanplants.ca/dbConnect.php?table=PlantNodes&PlantType=2&lat=55.51&lng=11.42&discoverer=testJoe

PlantTypes
1. Return full table to client (Client should store full table for reference until table is too large, then do locate query of PlantTypes))
Ex: http://urbanplants.ca/dbConnect.php?table=PlantType
Returns: [{"plant_id":"1","name":"Raspberry","sciName":"Rubus"}]

2. Return a specific query based on a PlantNode.  User clicks on Node, which queries based on PlantType id 1, 2 , 3, 4 etc
3. What is in season, pick to and from dates to limit searches for fruit.
4. ??

** Input all PlantTypes I can think of into Database.

User Table
1. Login -> client provide display_name & password fields, and response is Yes/No 1/0 
Ex: http://urbanplants.ca/dbConnect.php?table=Users&display_name=testGoal&password=1234
Returns: {"Result":"1"}

2. New user -> client provides most fields display_name, password, email
Ex: http://urbanplants.ca/dbConnect.php?table=Users&display_name=testMagic&password=1234&email=test%40magic.com
Returns: true

**3. Updating Rank, Confirmation , Discoveries

Date Format for SQL: 2015-04-27  YYYY-MM-DD


*/

//Variables for connecting to your database.
//These variable values come from your hosting account.
$hostname = "urbanplants.db.8384869.hostedresource.com";
$username = "urbanplants";
$dbname = "urbanplants";

//These variable values need to be changed by you before deploying
$password = "TTSJ4Lyfe!";



$usertable = $_GET['table'];
//$field = "PlantType";

//Connecting to your database
$con = mysql_connect($hostname, $username, $password) OR DIE ("Unable to
connect to database! Please try again later.");
mysql_select_db($dbname);


switch ($_GET['table']) {
    case "PlantType":
        //echo " <br> PlantType <br>";
		/*
		PlantTypes will likely be pre-populated.  However, there could be instances when we require inserting a new planttype. 
		For now this case just returns a json object with all of the plant types records which will be pulled into memory 
		on the client to be cached and used to reference information from PlantNode lookups.
		*/
		
		$query = "SELECT * FROM $usertable";
		$result = mysql_query($query);
		$json_response = array();
		
		while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
		{
			$row_array['plant_id'] = $row['plant_id'];
			$row_array['name'] = $row['name'];
			$row_array['sciName'] = $row['sciName'];
			//$row_array['plantType'] = $row['plantType'];
			//$row_array['discoverer'] = $row['discoverer'];
			//$row_array['confirmer'] = $row['confirmer'];
     
			//push the values in the array
			array_push($json_response,$row_array);
		}
		
		echo json_encode($json_response);
		
        break;
    case "PlantNodes":
        //echo "<br> PlantNodes <br>";
		
		if (empty($_GET['PlantType']))
		{
			$query = "SELECT * FROM $usertable";
			$result = mysql_query($query);
			$json_response = array();
		
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$row_array['node_id'] = $row['node_id'];
				$row_array['lat'] = $row['lat'];
				$row_array['lng'] = $row['lng'];
				$row_array['plantType'] = $row['plantType'];
				$row_array['discoverer'] = $row['discoverer'];
				$row_array['confirmer'] = $row['confirmer'];
     
				//push the values in the array
				array_push($json_response,$row_array);
			}
			
		}
		elseif (!empty($_GET['discoverer']))
		{
			$query = 'INSERT INTO `urbanplants`.`PlantNodes` (`node_id`, `lat`, `lng`, `plantType`, `discoverer`, `confirmer`) VALUES (NULL, \''. $_GET['lat'] .'\', \''. $_GET['lng'] .'\', \''.$_GET['PlantType'].'\', \''.$_GET['discoverer'].'\', \'\');';
			$result = mysql_query($query);
			//echo $result; //testing
			$json_response = array('success' => 'true');
		}
		else
		{
			$query = "SELECT * FROM $usertable WHERE PlantType = " . $_GET['PlantType'];
			$result = mysql_query($query);
			$json_response = array();
		
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$row_array['node_id'] = $row['node_id'];
				$row_array['lat'] = $row['lat'];
				$row_array['lng'] = $row['lng'];
				$row_array['plantType'] = $row['plantType'];
				$row_array['discoverer'] = $row['discoverer'];
				$row_array['confirmer'] = $row['confirmer'];
     
				//push the values in the array
				array_push($json_response,$row_array);
			}
		}
		
		
		echo json_encode($json_response);
				
        break;
    case "Users":
        /*
		Add new user -> sign up.  If an email address is in the parameter list, then it is a signup. 
		Return False or True based on success in inserting new record
		*/		
		if (!empty($_GET['email']))
		{
			$query = 'INSERT INTO `urbanplants`.`Users` (`user_id`, `email`, `display_name`, `password`, `rank`, `discoveries`, `confirmations`) VALUES (NULL, \'' . $_GET['email'] . '\', \'' . $_GET['display_name'] . '\', \'' . $_GET['password'] . '\', NULL, NULL, NULL);';
			$result = mysql_query($query);
			//$json_response = mysql_fetch_array($result, MYSQL_ASSOC);
			echo json_encode($result);
		}
		/*
		Login Verification, returns Json object: 
		{"Result":"0"} if login failed 
		or 
		{"Result":"1"} if login was successful
		*/
		else
		{
			$query = "SELECT COUNT(*) AS `Result` FROM `Users` WHERE display_name= '".$_GET['display_name']."' AND password= '".$_GET['password']."'";
		
			$result = mysql_query($query);
			
			$json_response = mysql_fetch_array($result, MYSQL_ASSOC);
			echo json_encode($json_response);
			
		}
		
		/*
		For users we need to have the ability to insert new user which is already implemented
		Second we need to implement a check against the database for the user/pass the person entered, and return a login success or failure.
		*/
		
        break;
	default:
		echo "<br>none/other<br>";
}


//Fetching from your database table.








/*
$result = mysql_query($query);


echo $query . '<br>';
echo $result . '<br>';

 //Create an array
    $json_response = array();
	
 while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $row_array['node_id'] = $row['node_id'];
        $row_array['lat'] = $row['lat'];
        $row_array['lng'] = $row['lng'];
        $row_array['plantType'] = $row['plantType'];
        $row_array['discoverer'] = $row['discoverer'];
		$row_array['confirmer'] = $row['confirmer'];
     
        //push the values in the array
        array_push($json_response,$row_array);
    }
    
	
	echo json_encode($json_response);
    
    //Close the database connection
    mysql_close($con);
	

//echo 'Hello ' . htmlspecialchars($_GET["name"]) . '!';
	*/
?>