(function () {

	var FilesLibreOfficeEditPlugin = {
		attach: function (fileList) {
			var self = this;

			// The mimetypes that should be handled by Microsoft Excel
			var excelSupportedMimetypes = [
				"application/vnd.ms-excel",
				"application/vnd.ms-excel.addin.macroEnabled.12",
				"application/vnd.ms-excel.sheet.binary.macroEnabled.12",
				"application/vnd.ms-excel.sheet.macroEnabled.12",
				"application/vnd.ms-excel.template.macroEnabled.12",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
			];
			// The mimetypes that should be handled by Microsoft Word
			var wordSupportedMimetypes = [
				"application/msword",
				"application/vnd.ms-word.document.macroEnabled.12",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			];
			
			// The mimetypes that should be handled by Microsoft PowerPoint
			var powerpointSupportedMimetypes = [
				"application/vnd.ms-powerpoint",
				"application/vnd.ms-powerpoint.template.macroEnabled.12",
				"application/vnd.ms-powerpoint.addin.macroEnabled.12",
				"application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
				"application/vnd.ms-powerpoint.presentation.macroEnabled.12",
				"application/vnd.openxmlformats-officedocument.presentationml.presentation",
				"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
				"application/vnd.openxmlformats-officedocument.presentationml.template",
			];
			
			// The mimetypes that Libreoffice can handle using vnd.libreoffice.command: 
			var supportedMimetypes = [
				"text/plain",

				"application/vnd.oasis.opendocument.formula",
				"application/vnd.oasis.opendocument.graphics",
				"application/vnd.oasis.opendocument.presentation",
				"application/vnd.oasis.opendocument.spreadsheet",
				"application/vnd.oasis.opendocument.text",
				"application/vnd.oasis.opendocument.text-template",
				"application/vnd.oasis.opendocument.spreadsheet-template",
				"application/vnd.oasis.opendocument.presentation-template",
				"application/vnd.oasis.opendocument.graphics-template",

				"application/msword",
				"application/vnd.ms-word.document.macroEnabled.12",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.template",

				"application/vnd.ms-excel",
				"application/vnd.ms-excel.addin.macroEnabled.12",
				"application/vnd.ms-excel.sheet.binary.macroEnabled.12",
				"application/vnd.ms-excel.sheet.macroEnabled.12",
				"application/vnd.ms-excel.template.macroEnabled.12",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.template",

				"application/vnd.ms-powerpoint",
				"application/vnd.ms-powerpoint.template.macroEnabled.12",
				"application/vnd.ms-powerpoint.addin.macroEnabled.12",
				"application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
				"application/vnd.ms-powerpoint.presentation.macroEnabled.12",
				"application/vnd.openxmlformats-officedocument.presentationml.presentation",
				"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
				"application/vnd.openxmlformats-officedocument.presentationml.template",
			];

			wordSupportedMimetypes.forEach (function (mimetype) {
				fileList.fileActions.registerAction({
					name: 'EditWithLibreOffice',
					displayName: t('fileslibreofficeedit', 'Edit with LIbreoffice'),
					mime: mimetype,
					order: 100,
					iconClass: 'icon-edit',
					permissions: OC.PERMISSION_UPDATE,
					actionHandler: self.editWithWord
				})
			});
			
			powerpointSupportedMimetypes.forEach (function (mimetype) {
				fileList.fileActions.registerAction({
					name: 'EditWithLibreOffice',
					displayName: t('fileslibreofficeedit', 'Edit with PowerPoint'),
					mime: mimetype,
					order: 100,
					iconClass: 'icon-edit',
					permissions: OC.PERMISSION_UPDATE,
					actionHandler: self.editWithPowerpoint
				})
			});
			
			excelSupportedMimetypes.forEach (function (mimetype) {
				fileList.fileActions.registerAction({
					name: 'EditWithLibreOffice',
					displayName: t('fileslibreofficeedit', 'Edit with Excel'),
					mime: mimetype,
					order: 100,
					iconClass: 'icon-edit',
					permissions: OC.PERMISSION_UPDATE,
					actionHandler: self.editWithExcel
				})
			});
/*
			supportedMimetypes.forEach (function (mimetype) {
				fileList.fileActions.registerAction({
					name: 'EditWithLibreOffice',
					displayName: t('fileslibreofficeedit', 'Edit with Word'),
					mime: mimetype,
					order: 100,
					iconClass: 'icon-edit',
					permissions: OC.PERMISSION_UPDATE,
					actionHandler: self.editWithLO
				})
			}); */
		},

		editWithLO: function (fileName, context) {
			var dir = context.dir || context.fileList.getCurrentDirectory();
			var isDir = context.$file.attr('data-type') === 'dir';
			var url = "vnd.libreoffice.command:ofe|u|" + window.location.protocol
				+ "//" + window.location.host + context.fileList.getDownloadUrl(fileName, dir, isDir);
			if (url) {
				OCA.Files.Files.handleDownload(url, null);
			}
		},
		
		// The MS Office URI:s can be found here https://docs.microsoft.com/en-us/office/client-developer/office-uri-schemes
		editWithWord: function (fileName, context) {
			var dir = context.dir || context.fileList.getCurrentDirectory();
			var isDir = context.$file.attr('data-type') === 'dir';
			var url = "ms-word:ofe|u|" + window.location.protocol
				+ "//" + window.location.host + context.fileList.getDownloadUrl(fileName, dir, isDir);
			if (url) {
				OCA.Files.Files.handleDownload(url, null);
			}
		},
		
		editWithExcel: function (fileName, context) {
			var dir = context.dir || context.fileList.getCurrentDirectory();
			var isDir = context.$file.attr('data-type') === 'dir';
			var url = "ms-excel:ofe|u|" + window.location.protocol
				+ "//" + window.location.host + context.fileList.getDownloadUrl(fileName, dir, isDir);
			if (url) {
				OCA.Files.Files.handleDownload(url, null);
			}
		},
		
		editWithPowerpoint: function (fileName, context) {
			var dir = context.dir || context.fileList.getCurrentDirectory();
			var isDir = context.$file.attr('data-type') === 'dir';
			var url = "ms-powerpoint:ofe|u|" + window.location.protocol
				+ "//" + window.location.host + context.fileList.getDownloadUrl(fileName, dir, isDir);
			if (url) {
				OCA.Files.Files.handleDownload(url, null);
			}
		},
	};

	OC.Plugins.register('OCA.Files.FileList', FilesLibreOfficeEditPlugin)

})();
