<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>

<div class="h-screen">
    <Accordion.Root class="w-full sm:max-w-[70%]">
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Where is my data saved?</Accordion.Trigger>
            <Accordion.Content>
                On your device, only accessible by your browser. For a more technical answer, it's using the 
                <a href="https://web.dev/articles/origin-private-file-system" target="_blank">
                    Origin Private File System.
                </a>
            </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
            <Accordion.Trigger>Why use this app instead of [insert app here]?</Accordion.Trigger>
            <Accordion.Content>
                Most journaling apps come with a raft of unneeded features or require a login. SimpleJournaler aims to
                make logging your days simple and to the point.
            </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-3">
            <Accordion.Trigger>How do I use this on another device?</Accordion.Trigger>
            <Accordion.Content>
                As your data is persistent to your device, you will need to export your SimpleJournaler database first 
                and re-import it on your new device. This can be done in the Settings page.
            </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-4">
            <Accordion.Trigger>Will you add syncing?</Accordion.Trigger>
            <Accordion.Content>
                Potentially. A sync feature would require data to be stored externally to your device and some method
                of authentication (e.g. a login) to retrieve your data, complicating what was once simple. A Google
                Drive or Dropbox integration would probably be the first implementation of a sync feature.
                <br><br>
                However, SimpleJournaler has been designed mobile-first as smartphones would be the most
                convenient and flexible option to be able to journal whenever you need to.
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
