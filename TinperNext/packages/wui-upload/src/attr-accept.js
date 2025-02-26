// import warning from "rc-util/es/warning";
export default (function(file, acceptedFiles) {
    if (file && acceptedFiles) {
        let acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
        let fileName = file.name || '';
        let mimeType = file.type || '';
        let baseMimeType = mimeType.replace(/\/.*$/, '');
        return acceptedFilesArray.some(function(type) {
            var validType = type.trim();
            // This is something like */*,*  allow all files
            if (/^\*(\/\*)?$/.test(type)) {
                return true;
            }
            // like .jpg, .png
            if (validType.charAt(0) === '.') {
                let lowerFileName = fileName.toLowerCase();
                let lowerType = validType.toLowerCase();
                let affixList = [lowerType];
                if (lowerType === '.jpg' || lowerType === '.jpeg') {
                    affixList = ['.jpg', '.jpeg'];
                }
                return affixList.some(function(affix) {
                    return lowerFileName.endsWith(affix);
                });
            }
            // This is something like a image/* mime type
            if (/\/\*$/.test(validType)) {
                return baseMimeType === validType.replace(/\/.*$/, '');
            }
            // Full match
            if (mimeType === validType) {
                return true;
            }
            // Invalidate type should skip
            if (/^\w+$/.test(validType)) {
                // warning(false, "Upload takes an invalidate 'accept' type '".concat(validType, "'.Skip for check."));
                return true;
            }
            return false;
        });
    }
    return true;
});