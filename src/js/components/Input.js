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
		};
	}

	changePost(post){
		this.setState({post});
	}

	changeSearch(search){
		this.setState({search});
		request('GET', '/search').end(callback);
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
	                    	const x = new Date();
	                    	let busNumber="";
	                    	let lateness ="";
	                    	let location ="";

	                    	try{
	                    		busNumber = (JSON.stringify(msg.nlu_interpretation_results.payload.interpretations[0].concepts.bus_number[0].concepts.nuance_CARDINAL_NUMBER[0].value, null, 2)).replace(/\"/g,"");
	                    	}catch(ex){
	                    		busNumber = "null";
	                    	}
	                    	try{
	                    		lateness = (JSON.stringify(msg.nlu_interpretation_results.payload.interpretations[0].concepts.bus_state[0].literal, null, 2)).replace(/\"/g,"");
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
								    currentTime: x,
								  })
							    .end()	
									
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
		return (
			<div>
				<h2>tell us what happened to your bus</h2>
				<Post changePost={this.changePost.bind(this)}/>
				<br/>
				<button onClick={this.submitPost.bind(this)}>post</button>
				<h2>search your bus</h2>
				<Search changeSearch={this.changeSearch.bind(this)}/>
				<Data busData={this.state.buses}/>
			</div>
		);
	}
}


