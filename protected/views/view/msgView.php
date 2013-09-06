<?php
/* @var $this AppController */

?>

<div class="navbar">
	<div class="navbar-inner">
		<div class="container-fluid">
			<span class="logo">My Life</span>
		</div>
	</div>
</div>
     
<div class="container msgView" >
	<div class="well span10 div-center" >
		
		<div class="text-center" ><h3>Dear <?php echo $contactName?></h3></div>
		<div class="text-center" ><h4>This is a message from <?php echo $userName?></h4></div>
		<hr />
		<div class="text-center" ><h4><?php echo $msgTitle?></h4></div>
		
		<div id="textContainer" style="font-size:120%"></div>
		
		<div id="audioContainer" class="text-center" style="display:none" > 
			
			<div id="jquery_jplayer_1" class="jp-jplayer"></div>
			<div id="jp_container_1" class="jp-audio div-center">
				<div class="jp-type-single">
					<div class="jp-gui jp-interface">
						<ul class="jp-controls">
							<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>
							<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>
							<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>
							<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>
							<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>
							<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>
						</ul>
						<div class="jp-progress">
							<div class="jp-seek-bar">
								<div class="jp-play-bar"></div>
							</div>
						</div>
						<div class="jp-volume-bar">
							<div class="jp-volume-bar-value"></div>
						</div>
						<div class="jp-time-holder">
							<div class="jp-current-time"></div>
							<div class="jp-duration"></div>

							<ul class="jp-toggles">
								<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>
								<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>
							</ul>
						</div>
					</div>
					<div class="jp-title">
						<ul>
							<li><?php echo $msgTitle?></li>
						</ul>
					</div>
					<div class="jp-no-solution">
						<span>Update Required</span>
						To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
					</div>
				</div>
			</div>
		
		
		</div>
		
		<div id="videoContainer" style="display:none" > 
			
			<div id="jp_container_2" class="jp-video jp-video-360p div-center">
				<div class="jp-type-single">
					<div id="jquery_jplayer_2" class="jp-jplayer"></div>
					<div class="jp-gui">
						<div class="jp-video-play">
							<a href="javascript:;" class="jp-video-play-icon" tabindex="1">play</a>
						</div>
						<div class="jp-interface">
							<div class="jp-progress">
								<div class="jp-seek-bar">
									<div class="jp-play-bar"></div>
								</div>
							</div>
							<div class="jp-current-time"></div>
							<div class="jp-duration"></div>
							<div class="jp-controls-holder">
								<ul class="jp-controls">
									<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>
									<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>
									<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>
									<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>
									<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>
									<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>
								</ul>
								<div class="jp-volume-bar">
									<div class="jp-volume-bar-value"></div>
								</div>
								<ul class="jp-toggles">
									<li><a href="javascript:;" class="jp-full-screen" tabindex="1" title="full screen">full screen</a></li>
									<li><a href="javascript:;" class="jp-restore-screen" tabindex="1" title="restore screen">restore screen</a></li>
									<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>
									<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>
								</ul>
							</div>
							<div class="jp-title">
								<ul>
									<li><?php echo $msgTitle?></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="jp-no-solution">
						<span>Update Required</span>
						To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div>


<script type="text/javascript">
//<![CDATA[
$(document).ready(function(){

	var type = '<?php echo $type?>';
	
	if(type=='2') {
		$("#audioContainer").show();
		$("#jquery_jplayer_1").jPlayer({
				ready: function (event) {
					$(this).jPlayer("setMedia", {
						//mp3:WEB_ROOT+"/userlib/"+"<?php echo $msgContent?>" 
						mp3:"<?php echo $msgContent?>" 
						});
				},
				swfPath: WEB_ROOT+"/js/jPlayer",
				supplied: "mp3",
				cssSelectorAncestor: "#jp_container_1"
			});
	}
	else if(type=='3'){	
		$("#videoContainer").show();
		$("#jquery_jplayer_2").jPlayer({
				ready: function () {
					$(this).jPlayer("setMedia", {
						m4v: "<?php echo $msgContent?>"
					});
				},
				swfPath: "jPlayer",
				supplied: "m4v",
				cssSelectorAncestor: "#jp_container_2",
				size: {
						width: "640px",
						height: "300px"
					  }

			});
	}
	else {  //text message
		$("#textContainer").html(decodeURIComponent("<?php echo $msgContent?>"));
	
	}

	
});
//]]>
</script>