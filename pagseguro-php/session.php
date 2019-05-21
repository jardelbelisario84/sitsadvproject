<?php 

require_once __DIR__ . '/vendor/autoload.php';

header('Access-Control-Allow-Origin: *');

putenv('PAGSEGURO_EMAIL=deskcodedesenvolvimentos@gmail.com');
putenv('PAGSEGURO_TOKEN_SANDBOX=4D629C716F72433D914E0DD83793152E');
putenv('PAGSEGURO_ENV=sandbox');

\PagSeguro\Library::initialize();
\PagSeguro\Library::cmsVersion()->setName("Sites Para Advogados")->setRelease("1.0.1");
\PagSeguro\Library::moduleVersion()->setName("Sites Para Advogados")->setRelease("1.0.2");


$sessionCode = \PagSeguro\Services\Session::create(
    \PagSeguro\Configuration\Configure::getAccountCredentials()
);

echo json_encode([
    'sessionId' => $sessionCode->getResult()
]);