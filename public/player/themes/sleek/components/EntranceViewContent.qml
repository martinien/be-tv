import QtQuick 2.1

Rectangle {
	anchors.centerIn: parent
	width: entranceblock.width < 694 ? (entranceblock.width -12) : 682
	height: 272
	color: "transparent"
	clip: true
}