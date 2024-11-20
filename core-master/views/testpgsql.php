<?php
if (extension_loaded('pgsql')) {
    echo "L'extension pgsql est activée !";
} else {
    echo "L'extension pgsql n'est pas activée.";
}
?>