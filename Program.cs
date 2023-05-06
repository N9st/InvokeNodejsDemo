namespace KwMusic
{
    internal class Program
    {
        static async Task Main()
        {
            KwSearch kwSearch = new();
            await kwSearch.Start("薛之谦");
        }
    }
}