<?php

namespace App\Http\Controllers;

use App\Install\Requirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

//use App\Models\BusinessSetting;

class InstallController extends Controller
{

    public function __construct()
    {
        // $this->middleware(RedirectIfInstalled::class);
    }

    public function index()
    {
        // return redirect()->route('install.init');
    }

    public function migrate()
    {
        // Artisan::call('migrate:fresh');
    }

    public function init()
    {
        Artisan::call('key:generate');
        $env = DotenvEditor::load();
        $env->setKey('APP_URL', URL::to('/'));
        $env->setKey('APP_ENV', 'local');
        $env->setKey('DB_SETUP', 'false');
        $env->setKey('APP_DEBUG', 'true');
        $env->save();
        return response('ok');
    }

    public function pre_installation(Requirement $requirement)
    {
        return response()->json([
            "directories" => $requirement->directories(),
            "extensions" => $requirement->extensions(),
            "satisfied" => $requirement->satisfied(),
        ]);
    }

    public function purchaseCodeVerify(Request $request)
    {
        $code = $request->validate(['code' => "required|string"])['code'];
        if (preg_match("/^(\{)?[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}(?(1)\})$/i", $code)) {
            $env = DotenvEditor::load();
            $env->setKey('APP_PCE', $code);
            $env->save();
            return response()->json(['status' => 'ok'], 202);
        } else {
            return response()->json(['message' => 'Invalid purchase code, please input a valid purchase code.'], 422);
        }
    }

    public function mail_setup()
    {
        // $db_setup = DotenvEditor::load()->getValue('DB_SETUP');
        // if ($db_setup == 'true') {
        //     return view('installation.mail_setup');
        // } else {
        //     return redirect()->route('install.database_setup')->with('error', 'Please setup your database connection first!');
        // }
    }

    public function admin_setup()
    {
        // return view('installation.admin_setup');
    }

    private function getPurchaseCode($product_code)
    {
        // $url = "https://api.envato.com/v3/market/author/sale?code=" . $product_code;
        // $curl = curl_init($url);
        // $header = array();
        // $pate = decrypt(config('app.pate'));
        // $header[] = 'Authorization: Bearer ' . $pate;
        // $header[] = 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:41.0) Gecko/20100101 Firefox/41.0';
        // $header[] = 'timeout: 20';
        // curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        // $envatoRes = curl_exec($curl);
        // curl_close($curl);
        // $envatoRes = json_decode($envatoRes);
        // return $envatoRes;
    }

    public function mailSetupStore()
    {
        // if (Request::input('skip_mailer') != 'on') {
        //     $mailVariables = Request::validate([
        //         'MAIL_HOST' => ['required'],
        //         'MAIL_PORT' => ['required'],
        //         'MAIL_USERNAME' => ['required'],
        //         'MAIL_PASSWORD' => ['required'],
        //         'MAIL_ENCRYPTION' => ['required'],
        //         'MAIL_FROM_ADDRESS' => ['nullable', 'email'],
        //         'MAIL_FROM_NAME' => ['nullable'],
        //     ]);
        //     $this->setEnvVariables($mailVariables);
        // }

        // if (Request::input('skip_pusher') != 'on') {
        //     $mailVariables = Request::validate([
        //         'PUSHER_APP_ID' => ['required'],
        //         'PUSHER_APP_KEY' => ['required'],
        //         'PUSHER_APP_SECRET' => ['required'],
        //         'PUSHER_APP_CLUSTER' => ['required'],
        //     ]);
        //     $this->setEnvVariables($mailVariables);
        // }
        // return redirect()->route('install.admin_setup');
    }

    private function setEnvVariables($data)
    {
        // $env = DotenvEditor::load();
        // foreach ($data as $data_key => $data_value) {
        //     $env->setKey($data_key, $data_value);
        // }
        // $env->save();
    }

    public function adminSetupSave()
    {
        // $data = Request::validate([
        //     'first_name' => ['required'],
        //     'last_name' => ['required'],
        //     'email' => ['required', 'email', 'unique:users'],
        //     'password' => ['required'],
        // ]);
        // User::create([
        //     'first_name' => $data['first_name'],
        //     'last_name' => $data['last_name'],
        //     'email' => $data['email'],
        //     'password' => $data['password'],
        //     'role_id' => 1,
        //     'title' => 'Admin',
        // ]);
        // try {
        //     $env = DotenvEditor::load();
        //     $env->setKey('APP_INSTALLED', 'true');
        //     $env->setKey('APP_ENV', 'production');
        //     $env->setKey('APP_DEBUG', 'false');
        //     $env->save();
        //     $this->clearCache();
        // } catch (\Throwable$e) {
        //     return redirect()->route('install.admin_setup')->with('error', 'Something went wrong! - ' . $e->getMessage());
        // }
        // return view('installation.complete');
    }

    public function database_installation(Request $request)
    {
        $data = $request->validate([
            'host' => 'required|string',
            'port' => 'required|string',
            'database' => 'required|string',
            'username' => 'required|string',
            'password' => 'nullable|string',
        ]);
        $hasError = null;
        if (!empty($skip_mysql) && $skip_mysql == 'on') {
            try {
                $env = DotenvEditor::load();
                $env->setKey('DB_CONNECTION', 'sqlite', 'To set MySQL database, use "mysql" here and add "DB_DATABASE" key on the next line');
                $env->deleteKey('DB_DATABASE');
                $env->setKey('DB_SETUP', 'true');
                $env->save();
                Artisan::call('config:cache');
            } catch (\Throwable$e) {
                return redirect()->route('install.database_setup')->with('error', $e->getMessage());
            }
        } else {
            try {
                $this->checkDatabaseConnection($data);
            } catch (\Throwable$e) {
                $hasError = $e;
            }
            if (!empty($hasError)) {
                if (in_array($data['host'], ['127.0.0.1', 'localhost'])) {
                    $data['host'] = ($data['host'] == 'localhost') ? '127.0.0.1' : 'localhost';
                    try {
                        $this->checkDatabaseConnection($data);
                    } catch (\Throwable$e) {
                        return response()->json(['message' => "Please check your database credentials carefully."], 400);
                    }
                } else {
                    return response()->json(['message' => "Please check your database credentials carefully."], 400);
                }
            }
            try {
                $this->setDatabaseVariables($data);
            } catch (\Throwable$e) {
                return response()->json(['message' => $e->getMessage()], 400);
            }
        }
        config(['database.setup' => true]);
        try {
            Artisan::call('migrate:fresh');
            Artisan::call('db:seed');
        } catch (\Exception$e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
        return response("ok");
    }

    private function checkDatabaseConnection($data)
    {
        $this->setupDatabaseConnectionConfig($data);
        DB::connection('mysql')->reconnect();
        DB::connection('mysql')->getPdo();
    }

    private function setupDatabaseConnectionConfig($data)
    {
        config([
            'database.default' => 'mysql',
            'database.connections.mysql.host' => $data['host'],
            'database.connections.mysql.port' => $data['port'],
            'database.connections.mysql.database' => $data['database'],
            'database.connections.mysql.username' => $data['username'],
            'database.connections.mysql.password' => $data['password'],
        ]);
    }

    private function setDatabaseVariables($data)
    {
        $env = DotenvEditor::load();
        $env->setKey('DB_CONNECTION', 'mysql');
        $env->setKey('DB_HOST', $data['host']);
        $env->setKey('DB_PORT', $data['port']);
        $env->setKey('DB_DATABASE', $data['database']);
        $env->setKey('DB_USERNAME', $data['username']);
        $env->setKey('DB_PASSWORD', $data['password']);
        $env->setKey('DB_SETUP', 'true');
        $env->save();
        Artisan::call('config:cache');
    }

    private function clearCache()
    {
        Artisan::call('optimize');
        Artisan::call('cache:clear');
        Artisan::call('route:cache');
        Artisan::call('view:clear');
        Artisan::call('config:cache');
        Artisan::call('clear-compiled');
    }
}
