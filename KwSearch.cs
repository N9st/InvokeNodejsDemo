﻿using System.Net.Http.Json;
using System.Reflection;
using System.Text;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using System.Web;
using Jering.Javascript.NodeJS;

namespace KwMusic
{
    class KwSearch
    {
        private readonly HttpClient HttpClient = new();
        private string? KwToken = string.Empty;
        //js脚本
        private readonly string SearchJs = string.Empty;
        //构造函数
        public KwSearch()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            //获取脚本路径
            string scriptPath = assembly.GetName().Name + ".Resources.KuWoSearch.js";
            //读
            using (Stream stream = assembly.GetManifestResourceStream(scriptPath)!)
            {
                using StreamReader streamReader = new(stream);
                SearchJs = streamReader.ReadToEnd();
            };
        }
        //开始搜索
        public async Task Start(string searchWord)
        {
            await GetKwToken();
            string urlEncodeSearchWord = HttpUtility.UrlEncode(Encoding.UTF8.GetBytes(searchWord));
            AddRequestHeaders(urlEncodeSearchWord, KwToken);
            string url = $"http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=" +
                $"{urlEncodeSearchWord}" +
                //rn = 20，代表获取20首歌曲
                $"&pn=1&rn=20&httpsStatus=1&reqId={await GetReqId()}";
            HttpResponseMessage httpResponseMessage = await HttpClient.GetAsync(url);
            Console.WriteLine(await httpResponseMessage.Content.ReadFromJsonAsync<JsonNode>());
        }
        //获取reqId
        private async Task<string> GetReqId()
        {
            return (await StaticNodeJSService.InvokeFromStringAsync<string>(SearchJs))!;
        }
        //获取kw_token
        private async Task GetKwToken()
        {
            if (!string.IsNullOrEmpty(KwToken))
            {
                return;
            }
            string url = "http://www.kuwo.cn/";
            AddRequestHeaders();
            HttpResponseMessage httpResponseMessage = await HttpClient.GetAsync(url);
            httpResponseMessage.Headers.TryGetValues("Set-Cookie", out var _kwToken);
            //正则匹配
            Match match = Regex.Match(_kwToken!.First(), "kw_token=(?<kwToken>([A-Z0-9]+));");
            if (match.Success)
            {
                KwToken = match.Groups["kwToken"].Value;
            }
            else
            {
                KwToken = string.Empty;
                Console.WriteLine("获取KwToken失败！");
            }
            //这种方式也可以
            //取9~19位，kwtoken有可能是11位或者是10位，10位就会多取一个“;”，
            //KwToken = _kwToken!.Where(x => x.Contains("kw_token")).First()[9..20].ToString().Replace(";", "");
        }
        //添加请求头
        private void AddRequestHeaders(string? searchWord = null, string? kwToken = null)
        {
            HttpClient.DefaultRequestHeaders.Clear();
            HttpClient.DefaultRequestHeaders.Add("User-Agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.68");
            if (searchWord != null & kwToken != null)
            {
                HttpClient.DefaultRequestHeaders.Add("Referer", $"http://www.kuwo.cn/search/list?key={searchWord}");
                HttpClient.DefaultRequestHeaders.Add("csrf", $"{kwToken}");
            }
        }
    }
}