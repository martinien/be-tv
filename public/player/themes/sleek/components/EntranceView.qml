import QtQuick 2.1
import QmlVlc 0.1

Rectangle {

	anchors.right: parent.right
  anchors.top: parent.top
	width: 650
	height: 500
	color: "#1C1C1C"


		VlcPlayer {
		id: vlcPlayer2;
		mrl: "https://www.youtube.com/watch?v=9bZkp7q19f0";
	}
	VlcVideoSurface {
		source: vlcPlayer2;
		anchors.centerIn: parent;
		anchors.top: parent.top;
		anchors.left: parent.left;
		width: parent.width;
		height: parent.height;
		fillMode: VlcVideoSurface.Stretch
		MouseArea {
			anchors.fill: parent;
			onClicked: vlcPlayer2.togglePause();
		}
	}


}
