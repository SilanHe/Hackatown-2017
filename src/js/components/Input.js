import React from "react";
import Post from "./Post";
import Search from "./Search";
import Request from "superagent";
import Data from "./Data";


export default class Input extends React.Component {
	constructor() {
		super();
		this.state= {
			post: "tell us what happened to your bus",
			search: "search",
			buses: {},
			answer: "",
		};
	}

	changePost(post){
		this.setState({post});
	}

	changeSearch(search){
		this.setState({search});
		// Credentials
		let busNumber ="";
		let lateness = "";
		var URL = 'wss://ws.dev.nuance.com/?';

		var APP_ID = "NMDPTRIAL_li_zhang17_mail_mcgill_ca20170204114956";
		var APP_KEY = "d036b815c2945b9352120bd25c35c930e96049c5484818b044aa15946bff113b36c950f85dac8bafbe96821acb4b4bb5ac947af4dc93a4213db9b5a8b8c6e4ee";
		var USER_ID = "";
		var NLU_TAG = "M5160_A2424";

		// ASR
		// See: https://developer.nuance.com/public/index.php?task=supportedLanguages
		var ASR_LANGUAGE = "eng-USA";

		// TTS
		// See: https://developer.nuance.com/public/index.php?task=supportedLanguages
		var TTS_LANGUAGE = "eng-USA";
		var TTS_VOICE = "";


		var defaultOptions = {
	        onopen: function() {
	            console.log("Websocket Opened");
	        },
	        onclose: function() {
	            console.log("Websocket Closed");
	        },
	        onvolume: function(vol) {
	            viz(vol);
	        },
	        onresult: (msg) => {
	          
	            if (msg.result_type === "NMDP_TTS_CMD" || msg.result_type === "NVC_TTS_CMD") {
	                //dLog(JSON.stringify(msg, null, 2), $ttsDebug);
	            } else if (msg.result_type === "NVC_ASR_CMD") {
	                //dLog(JSON.stringify(msg, null, 2), $asrDebug);
	            } else if (msg.result_type == "NDSP_ASR_APP_CMD") {
	                if(msg.result_format === "nlu_interpretation_results") {
	                    try{
	                        //dLog("interpretations = " + JSON.stringify(msg.nlu_interpretation_results.payload.interpretations, null, 2), $asrDebug);
	                    }catch(ex){
	                        //dLog(JSON.stringify(msg, null, 2), $asrDebug, true);
	                    }
	                } else {
	                    //dLog(JSON.stringify(msg, null, 2), $asrDebug);
	                }
	            } else if (msg.result_type === "NDSP_APP_CMD") {
	                if(msg.result_format === "nlu_interpretation_results") {
	                    try{
	                    	try{
	                    		busNumber = (JSON.stringify(msg.nlu_interpretation_results.payload.interpretations[0].concepts.bus_number[0].concepts.nuance_CARDINAL_NUMBER[0].value, null, 2)).replace(/\"/g,"");
	                    	}catch(ex){
	                    		try{
	                    			busNumber = (JSON.stringify(msg.nlu_interpretation_results.payload.interpretations[0].concepts.nuance_CARDINAL_NUMBER[0].value, null, 2)).replace(/\"/g,"");
	                    		}catch(ex){
	                    			busNumber = "null";
	                    		}
	                    	}
	                    	try{
	                    		lateness = (JSON.stringify(msg.nlu_interpretation_results.payload.interpretations[0].concepts.bus_state[0].value, null, 2)).replace(/\"/g,"");
	                    	}catch(ex){
	                    		lateness = "null";
	                    	}
	                    	//console.log(rawNuanceData[0].concepts.bus_number[0].concepts.nuance_CARDINAL_NUMBER[0].value);
	                    	const URL = "http://localhost:3000/api/posts?busNumber="+busNumber;
	                    	Request.get(URL).then((response) =>{
	                    		this.setState({buses: response.body});
	                    		this.setState({lateness: lateness});
	                    	});
	                    	
	                    }catch(ex){
	                        //dLog(JSON.stringify(msg, null, 2), $nluDebug, true);
	                    }
	                } else {
	                    //dLog(JSON.stringify(msg, null, 2), $nluDebug);
	                }
	            }
	        },
	        onerror: function(error) {
	            console.error(error);
	        }
	    };
		

		var options = Object.assign(defaultOptions);
		options.text = this.state.search;
		options.tag = NLU_TAG;
		options.language = TTS_LANGUAGE;
		options.appId = APP_ID;
		options.appKey = APP_KEY;
		options.url = URL;
		Nuance.startTextNLU(options)
	}



	submitPost(){
		// Credentials

		var URL = 'wss://ws.dev.nuance.com/?';

		var APP_ID = "NMDPTRIAL_li_zhang17_mail_mcgill_ca20170204114956";
		var APP_KEY = "d036b815c2945b9352120bd25c35c930e96049c5484818b044aa15946bff113b36c950f85dac8bafbe96821acb4b4bb5ac947af4dc93a4213db9b5a8b8c6e4ee";
		var USER_ID = "";
		var NLU_TAG = "M5160_A2424";

		// ASR
		// See: https://developer.nuance.com/public/index.php?task=supportedLanguages
		var ASR_LANGUAGE = "eng-USA";

		// TTS
		// See: https://developer.nuance.com/public/index.php?task=supportedLanguages
		var TTS_LANGUAGE = "eng-USA";
		var TTS_VOICE = "";


		var defaultOptions = {
	        onopen: function() {
	            console.log("Websocket Opened");
	        },
	        onclose: function() {
	            console.log("Websocket Closed");
	        },
	        onvolume: function(vol) {
	            viz(vol);
	        },
	        onresult: function(msg) {
	          
	            if (msg.result_type === "NMDP_TTS_CMD" || msg.result_type === "NVC_TTS_CMD") {
	                //dLog(JSON.stringify(msg, null, 2), $ttsDebug);
	            } else if (msg.result_type === "NVC_ASR_CMD") {
	                //dLog(JSON.stringify(msg, null, 2), $asrDebug);
	            } else if (msg.result_type == "NDSP_ASR_APP_CMD") {
	                if(msg.result_format === "nlu_interpretation_results") {
	                    try{
	                        //dLog("interpretations = " + JSON.stringify(msg.nlu_interpretation_results.payload.interpretations, null, 2), $asrDebug);
	                    }catch(ex){
	                        //dLog(JSON.stringify(msg, null, 2), $asrDebug, true);
	                    }
	                } else {
	                    //dLog(JSON.stringify(msg, null, 2), $asrDebug);
	                }
	            } else if (msg.result_type === "NDSP_APP_CMD") {
	                if(msg.result_format === "nlu_interpretation_results") {
	                    try{
	                    	//const rawNuanceData = JSON.parse(msg.nlu_interpretation_results.payload.interpretations);
	                    	//console.log(rawNuanceData[0].concepts.bus_number[0].concepts.nuance_CARDINAL_NUMBER[0].value);
	                    	const dateString = (new Date()).toLocaleTimeString("en-us", options);
	                    	let busNumber="";
	                    	let lateness ="";
	                    	let location ="";

	                    	try{
	                    		busNumber = (JSON.stringify(msg.nlu_interpretation_results.payload.interpretations[0].concepts.bus_number[0].concepts.nuance_CARDINAL_NUMBER[0].value, null, 2)).replace(/\"/g,"");
	                    	}catch(ex){
	                    		busNumber = "null";
	                    	}
	                    	try{
	                    		lateness = (JSON.stringify(msg.nlu_interpretation_results.payload.interpretations[0].concepts.bus_state[0].value, null, 2)).replace(/\"/g,"");
	                    	}catch(ex){
	                    		lateness = "null";
	                    	}
	                    	try{
	                    		location = (JSON.stringify(msg.nlu_interpretation_results.payload.interpretations[0].concepts.bus_stop[0].literal, null, 2)).replace(/\"/g,"");
	                    	}catch(ex){
	                    		location = "null";
	                    	}
	                    	
	                    	

							Request.post('http://localhost:3000/api/posts')
							    .send({
							    	busNumber: busNumber,
								    lateness: lateness,
									location: location,
								    currentTime: dateString,
								  })
							    .end()	
							alert('Thank you for your input!');
	                    }catch(ex){
	                        //dLog(JSON.stringify(msg, null, 2), $nluDebug, true);
	                    }
	                } else {
	                    //dLog(JSON.stringify(msg, null, 2), $nluDebug);
	                }
	            }
	        },
	        onerror: function(error) {
	            console.error(error);
	        }
	    };

		var options = Object.assign(defaultOptions);
		options.text = this.state.post;
		options.tag = NLU_TAG;
		options.language = TTS_LANGUAGE;
		options.appId = APP_ID;
		options.appKey = APP_KEY;
		options.url = URL;
		Nuance.startTextNLU(options)
				
				
	}

	render() {

		let answer;

		const busData = this.state.buses;
		let lateCount = 0;
		let earlyCount = 0;
		let onTimeCount = 0;
		for(let i = 0; i < busData.length; i++){

			if(busData[i].lateness == "-1"){
				lateCount+=1;
			}else if(busData[i].lateness == "1"){
				earlyCount+=1;
			}else if(busData[i].lateness == "0"){
				onTimeCount+=1;
			}
		}
		const TOTALCOUNT = lateCount + earlyCount + onTimeCount;
		const latePercent = Math.round((lateCount/TOTALCOUNT)*100);
		const earlyPercent = Math.round((earlyCount/TOTALCOUNT)*100);
		const onTimePercent = Math.round((onTimeCount/TOTALCOUNT)*100);
		if(this.state.lateness == 1){
			answer = (earlyPercent > 0.5)? "Yeah, its usually early: " + earlyPercent : "I wouldn't say that: " + earlyPercent;
		}else if(this.state.lateness == -1){
			answer = (latePercent > 0.5)? "Yeah, its usually late: " + latePercent : "Nope, its not usually late: " + latePercent;
		}else if(this.state.lateness == 0){
			answer = (onTimePercent > 0.5)? "Yeah, its usually on time: " + onTimePercent : "Nope, don't trust this bus: " + onTimePercent;
		}else{
			answer = "Late percent: " + latePercent + " Early percent: " + earlyPercent + " On Time Percent: " + onTimePercent;
		};
		console.log(this.state.buses);
		return (
			<div>
				<h2>tell us what happened to your bus</h2>
				<Post changePost={this.changePost.bind(this)}/>
				<br/>
				<button onClick={this.submitPost.bind(this)}>post</button>
				<h2>search your bus</h2>
				<Search changeSearch={this.changeSearch.bind(this)}/>
				<h3>{answer}</h3>
				<Data busData={this.state.buses}/>
			</div>
		);
	}
}


