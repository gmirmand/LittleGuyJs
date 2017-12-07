LittleGuyJs
===================

**LittleGuy** est un petit robot qui adore rendre service ! Bloqué sur votre écran, il vous **indique les points clés de la page** lorsque vous scrollez/parcourez la page.
Ainsi, il vous **parle lorsque quelque chose est intéressant**, en vous donnant des conseils/tips.

----------


Documents
-------------

#### <i class="icon-file"></i>Get started
Au niveau de la mise en place de ce plugin, rien de plus simple ! 

> **Git clone du projet:**
> - *git clone git@github.com:gmirmand/LittleGuyJs.git*
> - Ajout du stylesheet de LittleGuyJs
> - Ajout du Js de LittleGuyJs
> - Ajout d'une div "Container".

    **Stylesheet :** <link rel="stylesheet" href="{LibPATH}/src/css/LittleGuy.css">
    
    **Script JS :** <script src="{LibPATH}/src/librairies/LittleGuyJs/LittleGuy.js"></script>
    
    **HTML :** <div class="lg-container"></div> (sinon, la structure se place au niveau du tag <body>)


----------


#### <i class="icon-folder-open"></i> Dependencies
Ce plugin nécessite l'importation de [JQuery](http://jquery.com/download/). Veuillez à bien l'importer antérieurement à l'importation du Script LittleGuyJs


----------


#### <i class="icon-pencil"></i> Personnalisation

Comme expliqué, un petit robot va se promener sur votre écran et vous afficher, à des points clés de la page des informations. Pour ce faire, il vous faut spécifier les Triggs des dialogues ainsi que leur contenu.
> **PS:** Dès l'ajout du script d'importation de la librairie, celui-ci est exécuté.

La première étape est de spécifier les Triggs de la page. Les triggs corresponde à des id (donc unique). Ils se stock dans *lt_messageTrigg*
**ex: **     `var lt_messageTrigg = ['#test', '#test-2', '#test-3'];`

La seconde étape et de spécifier les Messages correspondant à chaques Trigg. *lt_messageTrigg[0]* correspondra à *lt_messageText[0]*
**ex: ** `var lt_messageText = ['WHAOU une div bleu', 'Et là une verte !', 'Tien, un petit bloc rouge'];
`
Enfin, il suffit de surcharger *LittleGuyJs.lt_message* avec le paramètre *trigg* et *message.*
**ex: **
`LittleGuyJs.lt_message = {
    trigg: lt_messageTrigg,
    text: lt_messageText };`

----------
Vous pouvez également changer la couleur du texte de bulle de dialogue de LittleGuy en faisant simplement :

    LittleGuyJs.lt_bubble = { color: '#123456' };
#### <i class="icon-thumbs-up-alt"> YEAAH Contact me ?

C'est cadeau si jamais : 

 <i class="icon-link"> https://www.gmirmand.fr/
 <i class="icon-link"> https://github.com/gmirmand
 <i class="icon-link"> https://www.linkedin.com/in/gmirmand/

