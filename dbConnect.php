

<?php
/*
Three Tables:

PlantNodes
PlantType
Users

Required Queries:

PlantNodes
1. Get all nodes 
2. Get all nodes specific to a PlantType (1,2,3,4,5) on client side 1,2,3,4,5 corresponds to the plant types. )
3. Get all nodes within a radius of X kms 
4. Combination of 2 and 3
5. ??

PlantTypes
1. Return full table to client (Client should store full table for reference until table is too large, then do locate query of PlantTypes))
2. Return a specific query based on a PlantNode.  User clicks on Node, which queries based on PlantType id 1, 2 , 3, 4 etc
3. What is in season, pick to and from dates to limit searchs for fruit.
4. ??

User Table
1. Login -> client provide display_name & password fields, and response is Yes/No 1/0 
2. New user -> client provides most fields display_name, password, email
3. ??



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
			echo $result; //testing
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
        //echo "<br>Users<br>".$_GET['email'];
		
		if (!empty($_GET['email']))
		{
			$query = 'INSERT INTO `urbanplants`.`Users` (`user_id`, `email`, `display_name`, `password`, `rank`, `discoveries`, `confirmations`) VALUES (NULL, \'' . $_GET['email'] . '\', \'' . $_GET['display_name'] . '\', \'' . $_GET['password'] . '\', NULL, NULL, NULL);';
			
		}
		else
		{
			$query = "SELECT * FROM $usertable WHERE display_name = '" . $_GET['display_name']."'";
			
			
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