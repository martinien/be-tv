import QtQuick 2.1
import QmlVlc 0.1
import "../../core/functions.js" as Wjs
import "../../core/hotkeys.js" as Hotkeys
import "ui-settings.js" as UI
import "components" as Loader


Rectangle {
	// We strongly recommend that you do not remove or change any of the global variables
	property var gobigplay: false;
	property var gobigpause: false;
	property var dragging: false;
	property var ismoving: 1;
	property var buffering: 0;
	property var autoloop: 0;
	property var automute: 0;
	property var allowfullscreen: 1;
	property var playlistmenu: false;
	property var entranceview: false;
	property var firealarmview: false;
	property var title: "";
	property var multiscreen: 0;
	property var timervolume: 0;
	property var glyphsLoaded: false;
	property var firsttime: 1;
	property var caching: 0;
	property var lastTime: 0;
	property var buttonNormalColor: UI.colors.toolbar.button;
	property var buttonHoverColor: UI.colors.toolbar.buttonHover;

		id: theview;
		color: UI.colors.videoBackground; // Set Video Background Color

	Loader.Fonts {
		id: fonts
		icons.source: UI.settings.iconFont
		defaultFont.source: UI.settings.defaultFont
		secondaryFont.source: UI.settings.secondaryFont
	}

	Loader.ArtworkLayer { id: artwork } // Load Artwork Layer (if set with .addPlaylist)

	Loader.VideoLayer { id: videoSource } // Load Video Layer

	// Start Subtitle Text Box
	Loader.SubtitleText {
		id: subtitlebox
		fontColor: UI.colors.font
		fontShadow: UI.colors.fontShadow
	}
	// End Start Subtitle Text Box




	// Title Bar (top bar)
	Loader.TitleBar {
		id: topText
		fontColor: UI.colors.titleBar.font
		backgroundColor: UI.colors.titleBar.background
		isVisible: (vlcPlayer.state == 3 || vlcPlayer.state == 4 || vlcPlayer.state == 6) ? UI.settings.titleBar == "fullscreen" ? fullscreen ? true : false : UI.settings.titleBar == "minimized" ? fullscreen === false ? true : false : UI.settings.titleBar == "both" ? true : UI.settings.titleBar == "none" ? false : false : false
	}
	// End Title Bar (top bar)


	// Draw Play Icon (appears in center of screen when Toggle Pause)
	Loader.BigPlayIcon {
		id: playtog
		color: UI.colors.bigIconBackground
		icon: UI.icon.bigPlay
		iconColor: UI.colors.bigIcon
	}
	// End Draw Play Icon (appears in center of screen when Toggle Pause)

	// Draw Pause Icon (appears in center of screen when Toggle Pause)
	Loader.BigPauseIcon {
		id: pausetog
		color: UI.colors.bigIconBackground
		icon: UI.icon.bigPause
		iconColor: UI.colors.bigIcon
	}
	// End Draw Pause Icon (appears in center of screen when Toggle Pause)


	// Start Playlist Menu
	Loader.Menu {
		id: playlistblock
		background.color: UI.colors.playlistMenu.background

		// Start Playlist Menu Scroll
		Loader.PlaylistMenuScroll {
			id: playlistScroll
			draggerColor: UI.colors.playlistMenu.drag
			backgroundColor: UI.colors.playlistMenu.scroller
			onDrag: Wjs.movePlaylist(mouseY)
		}
		// End Playlist Menu Scroll

		Loader.PlaylistMenuContent {

			Loader.PlaylistMenuItems { id: playlist } // Playlist Items Holder (This is where the Playlist Items will be loaded)

			// Top Holder (Title + Close Button)
			Loader.PlaylistMenuHeader {
				text: "Liste des chaînes"
				textColor: UI.colors.playlistMenu.headerFont
				backgroundColor: UI.colors.playlistMenu.header

				// Start Close Playlist Button
				Loader.PlaylistMenuClose {
					id: playlistClose
					icon: glyphsLoaded ? UI.icon.closePlaylist : ""
					iconSize: 9
					iconColor: playlistClose.hover.containsMouse ? UI.colors.playlistMenu.closeHover : UI.colors.playlistMenu.close
					color: playlistClose.hover.containsMouse ? UI.colors.playlistMenu.closeBackgroundHover : UI.colors.playlistMenu.closeBackground
				}
				// End Close Playlist Button
			}
			// End Top Holder (Title + Close Button)

		}
	}
	// End Playlist Menu


	Loader.EntranceView {
		id: entranceblock
	}

	Loader.FireAlarm {
		id: firealarmblock
		background.color: UI.colors.playlistMenu.background

		Loader.FireAlarmViewMessage{
			id: firealarmmessage
			textColor: UI.colors.playlistMenu.headerFont

		}
	}


	//Start custom events
	signal trigger(string message)
	onTrigger: console.log(message)

	//End custom events


	Component.onCompleted: Wjs.onQmlLoaded()
}
