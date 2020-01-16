// jQuery version of the function
function textfit() {    
    $('.textfit').each(function () {
        $(this).css('font-size', 'initial');
        $(this).wrapInner('<div class="textfit-inner" style="display:inline-block;white-space:nowrap"></div>');
        var fontSize = parseInt($(this).css('font-size')),
            containerWidth = $(this).outerWidth(),
            innerWidth = $(this).find('.textfit-inner').outerWidth(),
            newfontSize = (containerWidth * fontSize) / innerWidth,
            maxFont = $(this).data('textfit-max'),
            minFont = $(this).data('textfit-min'),
            adjust = $(this).data('textfit-adjust');

        if (adjust) { var newfontSize = newfontSize * adjust; }

        if (newfontSize > maxFont) {
            var newfontSize = maxFont
        } else if (newfontSize < minFont) {
            var newfontSize = minFont
        }

        $(this).css('font-size', newfontSize + 'px').find('.textfit-inner').contents().unwrap();
    });
}

// New Vanilla JS version of the function
function textfitJS() {
    const textfitElements = document.querySelectorAll(".textfit");

    textfitElements.forEach((container) => {
        // Setting the initial font-size
        container.style.fontSize = "initial";
        
        // Saving the initial HTML content of the container element in the originalHTML variable
        const originalHTML = container.innerHTML;

        // Wrapping the originalHTML content into new 'textfit-inner' div
        container.innerHTML = `
        <div class="textfit-inner" style="display:inline-block;white-space:nowrap">
            ${originalHTML}
        </div>`;
        
        const textfitInner = container.querySelector('.textfit-inner');
        const compStyles = window.getComputedStyle(container);
        const fontSize = parseInt(compStyles.getPropertyValue('font-size'));
        const containerWidth = container.offsetWidth;
        const textfitInnerWidth = textfitInner.offsetWidth;
        let newfontSize = (containerWidth * fontSize) / textfitInnerWidth;
        const maxFont = parseInt(container.dataset.textfitMax);
        const minFont = parseInt(container.dataset.textfitMin);
        const adjust = parseInt(container.dataset.textfitAdjust);

        if ( adjust ) { newfontSize = newfontSize * adjust; }

        if ( newfontSize > maxFont ) {
            newfontSize = maxFont;
        } else if ( newfontSize < minFont ) {
            newfontSize = minFont;
        }

        // Setting container's font size to calculated value
        container.style.fontSize = `${newfontSize}px`;

        // Removing the temporary 'textfit-inner' element
        textfitInner.remove();

        // Putting back the original content into container element
        container.innerHTML = originalHTML;
    });
}

textfitJS();
