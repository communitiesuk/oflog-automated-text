<script>
import mammoth from "mammoth";
mammoth.convertToHtml({path: "./test.docx"})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        console.log("messages",messages)
        console.log("html",html)
    })
    .catch(function(error) {
        console.error(error);
    });
</script>