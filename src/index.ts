import {Command, flags} from '@oclif/command'
import {isNil} from 'ramda'
import * as k8s from '@kubernetes/client-node'

class Uselessjscli extends Command {
  static description = 'list kubernetes pods by namespace'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // namespace (-n, --namespace)
    namespace: flags.string({char: 'n', description: 'namespace to use'})
  }

  static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(Uselessjscli)
    let namespace: string | undefined = 'default'

    if (!isNil(flags.namespace)) {
      namespace = flags.namespace
    }

    getPods(namespace as string)
  }
}

const getPods = (ns: string) => {
    // retrieve the pods
    let pods: any[] = []
    const kc = new k8s.KubeConfig()
    kc.loadFromDefault()

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
    k8sApi.listNamespacedPod(ns).then((res) => {
      pods = res.body.items.map(item => item.metadata?.name)

      for (const pod of pods) {
        console.log(`${pod} awesome !`)
      }
    })
}

export = Uselessjscli
