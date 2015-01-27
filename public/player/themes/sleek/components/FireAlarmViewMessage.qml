import QtQuick 2.1

Rectangle {
	property alias textColor: headerText.color

	anchors.fill: parent
	anchors.centerIn: parent

	color: "transparent"
	// Top "Title" text Holder
	Rectangle {

		color: "#1C1C1C"
		id: headerBack
		width: parent.width
		anchors.left: parent.left
		anchors.leftMargin: 0
		height: 60
		Text {
			id: headerText
			anchors.verticalCenter: parent.verticalCenter
			anchors.centerIn: parent
			font.pointSize: 25
			text: "Fumée détectée"
		}
	}
	// End Top "Title" text Holder
	Image{
		id: issuesecours
		width: (parent.width < 700) ? 200 : 500
		height: (parent.height < 500) ? 150 : 350
		smooth: true
		fillMode: Image.PreserveAspectFit
		anchors.verticalCenter: parent.verticalCenter
		anchors.leftMargin: 20
		source: "../../../../images/issue-de-secours.png"
	}

	Rectangle {
    		id: warning
    		width: parent.width - issuesecours.width
    		anchors.right: parent.right
    		anchors.bottom: parent.bottom
    		height: parent.height - headerBack.height
			color: "transparent"

    		Text {
    			id: warningText
    			anchors.verticalCenter: parent.verticalCenter
    			font.pointSize: 26
    			text: "Un détecteur de fumée a été déclenché \n\nVeuillez vous diriger vers l'issue de \nsecours la plus proche"
    			wrapMode: Text.WordWrap
    			color: "#d5d5d5"
    		}

    		Rectangle{
    			anchors.bottom: parent.bottom

    			Text {
    					anchors.bottom: parent.bottom
						id: closeText
						font.pointSize: 25
						text: "Fermer"
						color: "#d5d5d5"
					}
    		}
    	}

}
