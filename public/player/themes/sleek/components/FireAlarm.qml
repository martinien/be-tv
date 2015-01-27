import QtQuick 2.1

Rectangle {
	property alias background: menuBackground

	visible: false
	anchors.centerIn: parent
	width: 2 * parent.width / 3
	height: 2 * parent.height / 3
	color: "transparent"
	Rectangle {
		id: menuBackground
		anchors.fill: parent
	}
	MouseArea {
		hoverEnabled: true
		anchors.fill: parent
	}
}