angular.module('app.directives', [])


.directive('fileButton', function() {
    return {
        link: function(scope, element, attributes) {

            var el = angular.element(element)
            var button = el.children()[0]

            el.css({
                position: 'relative',
                overflow: 'hidden',
                width: button.offsetWidth,
                height: button.offsetHeight
            })

            var fileInput = angular.element('<input type="file" />')
            fileInput.css({
                position: 'absolute',
                top: 0,
                left: 0,
                'z-index': '2',
                width: '100%',
                height: '100%',
                opacity: '0',
                cursor: 'pointer'
            })

            el.append(fileInput)


        }
    }
})

.directive('blankDirective', [function(){

}]);